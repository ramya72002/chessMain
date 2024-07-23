"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar"; // Assuming sidebar is in the same directory
import PortalHeader from "./portalheader";
import "./globals.css";
import Hero from "./hero/page";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="layout-container">
          {(pathname === "/portalhome" || pathname === "/learnclass"||pathname=="/puzzles"||pathname=="/levels/level1"||pathname=="/levels/level2"
            ||pathname=="/levels/level3"||pathname=="/levels/level4"||pathname=="/chessPuzzle"||pathname=="/levels/level2test"||pathname=="/levels/level3test"
            ||pathname=="/levels/level4test"
          ) && <Sidebar />}
           <div className="content-container">
            {pathname !== "/" && pathname !== "/signin"&& pathname !== "/tornuments" && <PortalHeader />}
            {pathname === "/" ? <Hero /> : <div className="scrollable-content">{children}</div>}
          </div>
        </div>
      </body>
    </html>
  );
}
