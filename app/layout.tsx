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
import SearchModal from "./components/modals/SearchModal";

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
					<SearchModal />
					<RentModal />
					<LoginModal />
					<RegisterModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className="relative z-10 w-full min-h-screen pb-20 pt-10">
					{children}
				</div>
			</body>
		</html>
	);
}
