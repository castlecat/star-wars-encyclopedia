import type { Metadata } from "next";
import { ApolloWrapper } from "../components/ApolloWrapper";
import localFont from "next/font/local";
import "./globals.css";

const starJedi = localFont({
  src: "/../../public/fonts/Starjedi.ttf",
  variable: "--font-starjedi",
});

export const metadata: Metadata = {
  title: "Star Wars Encyclopedia",
  description: "An encyclopedia of Star Wars characters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${starJedi.variable}`}>
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
