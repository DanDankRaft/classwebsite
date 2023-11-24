import "./globals.css";
import "./fonts.css";
import Link from "next/link";
import AccessibilityMenu from "./accessibility";

export const metadata = {
  title: "Queer Texas Exhibition",
  description:
    "An exhibition of Queer history in Texas made by UTD students for HIST4348 in Fall 2023",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className="flex min-h-screen flex-col items-center p-2 md:px-24 md:py-5"
      >
        <Link href="/">
          <h1 className="text-[3.25rem] sm:text-[3.5rem] leading-none text-center md:text-7xl font-bold select-none">
            <span className="magicO">Ecstatic</span> Time
          </h1>
        </Link>
          <p className="text-center text-2xl select-none">HERE in the QUEER SOUTH</p>
          <AccessibilityMenu />
        {children}
      </body>
    </html>
  );
}
