import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import Provider from "@/components/Provider";
import 'react-toastify/dist/ReactToastify.css';
import "@uploadthing/react/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NextNProgressClient from "@/components/NextNProgressClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechStack",
  description: "Find your Stack that will work for you",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>

        <Provider>
          <NextNProgressClient />
          <Navbar />
          {children}
          <Footer />
        </Provider>

        <ToastContainer position="top-center" autoClose={1000} />

      </body>

    </html>
  );
}
