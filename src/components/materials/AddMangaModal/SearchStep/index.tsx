import Input from "@/components/elements/Input";
import classes from "./classes.module.scss";
import Button, { EButtonVariant } from "@/components/elements/Button";
import { useCallback, useEffect, useState } from "react";
import { Manga } from "@tutkli/jikan-ts";
import { MdSearch } from "react-icons/md";
import JikanService from "@/services/jikan";
import ResultCard from "./ResultCard";

type IProps = {
	onSelect: (manga: Manga) => void;
	onClose: () => void;
};

export default function SearchStep(props: IProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<Manga[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onClose = useCallback(() => {
		props.onClose();
		setSearchQuery("");
		setSearchResults([]);
		setError(null);
	}, [props.onClose]);

	const performSearch = useCallback((query: string) => {
		setIsSearching(true);
		setError(null);

		JikanService.getInstance()
			.searchManga(query, 5)
			.then(setSearchResults)
			.catch((err) => {
				console.error("Erreur API Jikan:", err);
				setError("Erreur lors de la recherche. Veuillez réessayer.");
				setSearchResults([]);
			})
			.finally(() => {
				setIsSearching(false);
			});
	}, []);

	// Recherche avec debounce
	useEffect(() => {
		if (!searchQuery.trim()) {
			setSearchResults([]);
			return;
		}

		const timeoutId = setTimeout(() => {
			performSearch(searchQuery);
		}, 300);

		return () => clearTimeout(timeoutId);
	}, [searchQuery]);

	return (
		<div className={classes["root"]}>
			<div className={classes["header"]}>
				<div className={classes["gradient"]} />
				<h2 className={classes["title"]}>Ajouter un nouveau manga</h2>
			</div>

			<Input id="manga-search" type="text" value={searchQuery} onChange={setSearchQuery} placeholder="Tapez le nom d'un manga..." icon={MdSearch} autoComplete="off" />

			{isSearching && searchResults.length === 0 && (
				<div className={classes["loading-content"]}>
					<div className={classes["spinner"]} />
					<div className={classes["loading-info"]}>
						<span className={classes["loading-text"]}>Recherche en cours...</span>
						<span className={classes["loading-subtext"]}>Exploration de la base de données</span>
					</div>
				</div>
			)}

			{searchResults.length > 0 && (
				<div className={classes["search-results"]}>
					{searchResults.map((manga) => (
						<ResultCard key={manga.mal_id} manga={manga} onSelect={props.onSelect} />
					))}
				</div>
			)}

			{!searchQuery && (
				<div className={classes["hint-content"]}>
					<MdSearch className={classes["hint-icon"]} />
					<div className={classes["hint-text"]}>
						<span className={classes["hint-title"]}>Commencez votre recherche</span>
						<span className={classes["hint-subtitle"]}>Tapez le nom d'un manga pour voir les suggestions</span>
					</div>
				</div>
			)}

			{searchQuery && !isSearching && searchResults.length === 0 && (
				<div className={classes["no-results-content"]}>
					<div className={classes["no-results-icon"]}>📚</div>
					<span className={classes["no-results-title"]}>Aucun résultat trouvé</span>
					<span className={classes["no-results-subtitle"]}>Essayez avec un autre terme de recherche</span>
				</div>
			)}

			{error && (
				<div className={classes["error-content"]}>
					<span className={classes["error-icon"]}>⚠️</span>
					<span>{error}</span>
				</div>
			)}

			<Button onClick={onClose} variant={EButtonVariant.OUTLINED}>
				Annuler
			</Button>
		</div>
	);
}
