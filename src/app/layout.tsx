import "@/themes";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { MangaProvider } from "@/contexts/MangaContext";
import classes from "./layout.module.scss";
// import NavMenu from "@/components/elements/NavMenu";
import AuthGuard from "@/components/elements/AuthGuard";
import FloatingAddButton from "@/components/elements/FloatingAddButton";

const roboto = Roboto({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "Manga Tracker",
	description: "Votre tracker de mangas personnel",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="fr" className={roboto.className}>
			<AuthProvider>
				<MangaProvider>
					<body className={classes["root"]}>
						<AuthGuard>
							{children}
							{/* <NavMenu /> */}
							<FloatingAddButton />
						</AuthGuard>
					</body>
				</MangaProvider>
			</AuthProvider>
		</html>
	);
}
