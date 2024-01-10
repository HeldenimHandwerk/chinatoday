"use server";

import md5 from "md5";
import {
  PollyClient,
  SynthesizeSpeechCommand,
  SynthesizeSpeechInput,
} from "@aws-sdk/client-polly";

import { Readable } from "stream";

export async function sendemail(formData: FormData) {
  const email = formData.get("email") as string;
  const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID;
  const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY;
  const DATACENTER = process.env.NEXT_PUBLIC_MAILCHIMP_API_SERVER;

  try {
    const memberHash = md5(email.toLowerCase());
    const memberEndpoint = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members/${memberHash}`;

    // Check if the user exists in the list
    const checkResponse = await fetch(memberEndpoint, {
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (checkResponse.ok) {
      // User exists, update their subscription status
      const updateResponse = await fetch(memberEndpoint, {
        body: JSON.stringify({ status: "pending" }), // Pending status for double opt-in
        headers: {
          Authorization: `apikey ${API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update subscriber status.");
      }

      return {
        message:
          "Please confirm your subscription in the email we've just sent you.",
      };
    } else {
      // User does not exist or is deleted, add them as new
      const addResponse = await fetch(
        `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
        {
          body: JSON.stringify({ email_address: email, status: "subscribed" }), // Pending status for double opt-in
          headers: {
            Authorization: `apikey ${API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      if (!addResponse.ok) {
        const errorData = await addResponse.json();
        throw new Error(errorData.title || "Failed to subscribe.");
      }

      return {
        message: "You have been Subscribed!",
      };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred." };
  }
}

export async function textToSpeech(text: string) {
  const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? "";
  const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? "";
  const awsRegion = process.env.NEXT_PUBLIC_AWS_REGION ?? "us-east-1";

  const client = new PollyClient({
    region: awsRegion,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  // Split text into chunks
  const chunkSize = 2900; // slightly less than 3000 to be safe
  const textChunks =
    text.match(new RegExp(".{1," + chunkSize + "}", "g")) || [];

  let combinedBuffer = Buffer.alloc(0);

  for (const chunk of textChunks) {
    const ssmlText = `<speak>
                      <prosody rate="fast" pitch="medium">
                        ${chunk}
                      </prosody>
                    </speak>`;

    const params: SynthesizeSpeechInput = {
      Text: ssmlText,
      TextType: "ssml",
      OutputFormat: "mp3",
      VoiceId: "Vicki",
      LanguageCode: "de-DE",
    };

    const command = new SynthesizeSpeechCommand(params);
    const response = await client.send(command);

    if (response.AudioStream) {
      const buffer = await streamToBuffer(
        response.AudioStream instanceof Readable
          ? response.AudioStream
          : new Readable()
      );
      combinedBuffer = Buffer.concat([combinedBuffer, buffer]);
    } else {
      throw new Error("AudioStream is undefined");
    }
  }

  // Convert combined Buffer to a Blob URL and return it
  return `data:audio/mp3;base64,${combinedBuffer.toString("base64")}`;
}

// Helper function to convert a stream to a Buffer
function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

export async function search(query: string) {
  try {
    // Construct the URL with query parameters for Strapi's built-in filter
    const url = new URL(
      `https://jellyfish-app-qw7fr.ondigitalocean.app/api/articles?populate=*&sort=updatedAt:desc&`
    );
    url.searchParams.append("filters[title][$containsi]=", query);

    const response = await fetch(url.toString(), {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });
    if (!response.ok) {
      throw new Error("Search request failed");
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
