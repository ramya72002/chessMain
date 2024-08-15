"use client";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar"; // Assuming sidebar is in the same directory
import PortalHeader from "./portalheader";
import AdminHeader from "./admin/admin_header/adminHeader";
import "./globals.css";
import Hero from "./hero/page";
import Sidebar2 from "./sidebar2";

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
          {(pathname === "/portalhome" || 
          pathname === "/imagepuzzle"||pathname === "/arena/puzzleArena"|| pathname === "/learnclass"|| pathname === "/arena/startArena"||pathname=="/puzzles"||pathname=="/levels/level1"||pathname=="/levels/level2"
            ||pathname=="/levels/level3"||pathname=="/levels/level4"||pathname=="/chessPuzzle"||pathname=="/ChessPuzzle"||pathname=="/levels/level2test"||pathname=="/levels/level3test"
            ||pathname=="/levels/level4test"||pathname=="/tournaments"||pathname=="/tournamentRegistration"||pathname=="/arena/insidepuzzlearena"||pathname=="/learning") && <Sidebar />}
            {(pathname === "/inprogress"||pathname === "/level1Modules/module1"||pathname === "/level1Modules/module2"||pathname === "/level1Modules/module3"||pathname === "/level1Modules/module4"||pathname === "/level1Modules/module5") && <Sidebar2/>}
           <div className="content-container">
            {/* {pathname !== "/" && pathname !== "/signin"&&pathname !== "/signup"&&pathname !== "/admin/admin_upcoming_activities" && pathname !== "/admin" && pathname !== "/admin/admin_image_puzzles"&&pathname !== "/admin/StudentDetails" && pathname !== "/admin/admin_tournaments" && pathname !== "/StudentDetails" && pathname !== "/homeTournament"&& pathname !== "/homeTornRegister"  && <PortalHeader />} */}
            {(pathname === "/admin" || pathname === "/admin/admin_upcoming_activities" ||   pathname === "/admin/admin_tournaments"||pathname === "/admin/admin_image_demo"||pathname === "/admin/StudentDetails") && <AdminHeader />}
            {pathname === "/" ? <Hero /> : <div className="scrollable-content">{children}</div>}
          </div>
        </div>
      </body>
    </html>
  );
}
