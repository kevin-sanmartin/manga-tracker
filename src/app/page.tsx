import Home from "@/components/pages/Home";
import { Metadata } from "next/dist/lib/metadata/types/metadata-interface";

export const metadata: Metadata = {
	title: "Boilerplate App - Home",
	description: "Welcome to the Boilerplate App home page",
};

// Respect the coding style, inside /app it's always "Page" and import <*YourPage*> from "@/components/pages"
export default function Page() {
	return <Home />;
}
