import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";

import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";
import ClientOnly from "./components/ClientOnly";

//? Theme color for mobile
export const viewport: Viewport = {
	themeColor: "#f43f5e" //primary color
};

//? Font family
const nunito = Nunito({ subsets: ["latin"] });

//? Metadata
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
				<ClientOnly>
					<ToasterProvider />
					<RentModal />
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
        <div className="mt-40 w-full fixed z-10 pb-20 pt-18">
          {children}
        </div>
			</body>
		</html>
	);
}
