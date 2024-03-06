import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'
import Header from '@/app/utils/Header'
import Footer from '@/app/utils/Footer'
import Cookies from '@/app/utils/cookies'

// Importing Roboto font
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'China Today | Aktuelle Nachrichten',
  description:
    'Informieren Sie sich über Politik, Wirtschaft, Kultur und das gesellschaftliche Leben in China mit täglichen Nachrichten und Berichten auf Deutsch. Erhalten Sie frische, gut recherchierte Updates.',
  openGraph: {
    title: 'China Today | Aktuelle Nachrichten',
    description:
      'Informieren Sie sich über Politik, Wirtschaft, Kultur und das gesellschaftliche Leben in China mit täglichen Nachrichten und Berichten auf Deutsch. Erhalten Sie frische, gut recherchierte Updates.',
    type: 'website',
    url: 'https://www.china-today.de/',
    images: [
      {
        url: 'https://www.china-today.de/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.02bcd769.png&w=1080&q=75',
        width: 800,
        height: 600,
        alt: 'China Today Image'
      }
    ]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Applying Roboto font to the body */}
      <body className={roboto.className}>
        {/* <GoogleAnalytics /> */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
  `}
        </Script>
        <script
          src="https://assets.usestyle.ai/seonajsplugin"
          defer
          id="seona-js-plugin"
        ></script>

        <Header />
        <Cookies>{children}</Cookies>
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
