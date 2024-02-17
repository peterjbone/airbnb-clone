import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
//import ClientOnly from "./components/ClientOnly";

export const viewport: Viewport = {
	themeColor: "#ed61d6" //rose color
};

//? Font family
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Airbnb - Clone",
	description:
		"This is a website clone of the official airbnb website, i am not the owner."
};

//prettier-ignore
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const currentUser = await getCurrentUser()
	return (
		<html lang="en">
      <body className={nunito.className}>
          <ToasterProvider />
          <RentModal/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar currentUser={ currentUser } />
        {children}
      </body>
		</html>
	)
}
