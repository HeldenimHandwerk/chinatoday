"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaStop,
  FaSpinner,
  FaPlayCircle,
} from "react-icons/fa";
import { textToSpeech } from "@/app/action";

interface TextToSpeechButtonProps {
  text: string;
}

const TextToSpeechButton: React.FC<TextToSpeechButtonProps> = ({ text }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    audioRef.current = new Audio();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
      startProgressTracker();
    } else if (audioRef.current) {
      audioRef.current.pause();
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isPlaying]);

  const startProgressTracker = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setProgress((currentTime / duration) * 100);
      }
    }, 1000) as unknown as number;
  };

  const handlePlayButtonClick = async () => {
    setShowControls(true);
    if (!audioUrl) {
      setIsLoading(true);
      try {
        const url: string = await textToSpeech(text);
        setAudioUrl(url);
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.addEventListener("ended", () => setIsPlaying(false));
        }
      } catch (error) {
        console.error("Error fetching audio", error);
      }
      setIsLoading(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const totalWidth = rect.width;
    const clickedPosition = (x / totalWidth) * audioRef.current.duration;

    audioRef.current.currentTime = clickedPosition;
    setProgress((clickedPosition / audioRef.current.duration) * 100);
  };

  const buttonClass =
    "rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50";
  const progressBarClass =
    "flex-grow h-2 bg-gray-300 rounded-full overflow-hidden cursor-pointer transition duration-300 ease-in-out";
  const progressBarFillClass =
    "bg-red-600 h-full rounded-full transition duration-300 ease-in-out";

  const formatDuration = (durationSeconds: number) => {
    const minutes = Math.floor(durationSeconds / 60);
    if (minutes === 0) return "Weniger als 1 Minute";
    return `${minutes} ${minutes === 1 ? "Minute" : "Minuten"}`;
  };

  const estimatedDuration = () => {
    const wordCount = text.split(" ").length;
    const durationInMinutes = wordCount / 200; // Average reading speed
    const durationInSeconds = durationInMinutes * 60;
    return formatDuration(durationInSeconds);
  };

  // JSX rendering...
  if (!showControls) {
    return (
      <div className="flex items-center space-x-4 border p-3 rounded-lg shadow-lg bg-gray-100">
        <button
          onClick={handlePlayButtonClick}
          className="text-red-600 text-6xl hover:scale-105 transition-all duration-300"
        >
          <FaPlayCircle size="40px" />
        </button>
        <div className="flex">
          <span className="text-lg text-gray-700">
            Artikel anhören • {estimatedDuration()}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 border p-3 rounded-lg shadow-lg bg-gray-100">
      {isLoading ? (
        <FaSpinner className="animate-spin text-red-600" size="24px" />
      ) : (
        <button
          onClick={handlePlayButtonClick}
          className={`text-red-600 ${buttonClass}`}
          disabled={!audioUrl}
        >
          {isPlaying ? <FaPause size="24px" /> : <FaPlay size="24px" />}
        </button>
      )}
      <button onClick={handleStop} className={`text-red-600 ${buttonClass}`}>
        <FaStop size="24px" />
      </button>
      <div className={progressBarClass} onClick={handleProgressBarClick}>
        <div
          className={progressBarFillClass}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TextToSpeechButton;
