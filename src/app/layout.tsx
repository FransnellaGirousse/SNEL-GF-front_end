import localFont from "next/font/local";
import "./globals.css";
import clsx from "clsx";
import NextTopLoader from "nextjs-toploader";
import {SessionWrapper} from "@/lib/SessionWrapper";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <SessionWrapper>
        <html lang="fr" suppressHydrationWarning>
        <body
            className={clsx(geistSans.variable, geistMono.variable, "antialiased bg-white")}
        >
        <NextTopLoader
            color="#2196F3"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2196F3,0 0 5px #2196F3"
        />
        <ToastContainer
        position="top-center"
        autoClose={8000}
        />
        {children}
        </body>
        </html>
      </SessionWrapper>
  );
}