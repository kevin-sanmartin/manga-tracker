"use client";
import { useEffect, useState } from "react";
import classes from "./classes.module.scss";
import Container from "../../elements/Container";
import Input from "@/components/elements/Input";
import { FaSearch } from "react-icons/fa";
import Card from "@/components/elements/Card";
import { MangaService } from "@/services/MangaService";
import { useAuth } from "@/contexts/AuthContext";
import { MangaTable } from "@/types/manga";

export default function Home() {
	const { user } = useAuth();
	const [searchQuery, setSearchQuery] = useState("");
	const [mangas, setMangas] = useState<MangaTable[]>([]);

	useEffect(() => {
		if (!user) return;
		MangaService.getInstance().getUserMangas(user).then(setMangas).catch(console.error);
	}, [user]);

	return (
		<main className={classes["root"]}>
			<Container background="white" boxShadow className={classes["search-container"]}>
				<Input id="search" value={searchQuery} onChange={setSearchQuery} placeholder="Rechercher un manga..." icon={FaSearch} />
			</Container>

			<Container scrollable className={classes["manga-list"]}>
				{mangas
					.filter((manga) => manga.title.toLowerCase().includes(searchQuery.toLowerCase()))
					.map((manga, index) => (
						<Card key={index} manga={manga} />
					))}
				{mangas.length === 0 && <p className={classes["no-results"]}>Aucun manga dans la bibliothèque.</p>}
				{mangas.filter((manga) => manga.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
					<p className={classes["no-results"]}>Aucun résultat trouvé pour "{searchQuery}".</p>
				)}
			</Container>
		</main>
	);
}
