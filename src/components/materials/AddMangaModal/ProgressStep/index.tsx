import InputNumber from "@/components/elements/InputNumber";
import classes from "./classes.module.scss";
import Button, { EButtonVariant } from "@/components/elements/Button";
import { MdNumbers, MdArrowBack, MdAutoStories, MdPerson, MdTrendingUp, MdCheckCircle } from "react-icons/md";
import { useCallback, useState } from "react";
import { Manga } from "@tutkli/jikan-ts";
import { MangaService } from "@/services/MangaService";
import { useAuth } from "@/contexts/AuthContext";
import { useMangaContext } from "@/contexts/MangaContext";

const mangaService = MangaService.getInstance();

type IProps = {
	selectedManga: Manga;
	onClose: () => void;
	backToSearch: () => void;
};

export default function ProgressStep(props: IProps) {
	const [currentProgress, setCurrentProgress] = useState<number>(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { user } = useAuth();
	const { triggerRefresh } = useMangaContext();

	const handleProgressSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();

			setLoading(true);
			setError(null);

			if (isNaN(currentProgress) || currentProgress < 0) {
				setError(`Le progrès doit être un nombre positif`);
				setLoading(false);
				return;
			}

			if (props.selectedManga.volumes && currentProgress > props.selectedManga.volumes) {
				setError(`Le progrès doit être entre 0 et ${props.selectedManga.volumes}`);
				setLoading(false);
				return;
			}

			try {
				if (!user) {
					setError("Vous devez être connecté pour ajouter un manga");
					setLoading(false);
					return;
				}

				// Vérifier si le manga existe déjà
				const mangaExists = await mangaService.checkIfMangaExists(user, props.selectedManga.title);
				if (mangaExists) {
					setError("Ce manga est déjà dans votre collection");
					setLoading(false);
					return;
				}

				// Préparer les données pour la sauvegarde
				const mangaData = {
					title: props.selectedManga.title,
					author: props.selectedManga.authors?.[0]?.name || "Auteur inconnu",
					totalTome: props.selectedManga.volumes || 0,
					actualTome: currentProgress,
					genre: props.selectedManga.genres?.map((g) => g.name).join(", ") || "Non classé",
					coverUrl: props.selectedManga.images.jpg.image_url || "",
				};

				// Sauvegarder dans la BDD
				await mangaService.createManga(user, mangaData);

				// Déclencher le rafraîchissement de la liste
				triggerRefresh();
				props.onClose();
			} catch (err: any) {
				setError(err.message || "Une erreur est survenue");
			} finally {
				setLoading(false);
			}
		},
		[props.selectedManga, currentProgress, props.onClose, user, triggerRefresh],
	);

	return (
		<div className={classes["root"]}>
			<div className={classes["header"]}>
				<div className={classes["gradient"]} />
				<h2 className={classes["title"]}>Définir votre progression</h2>
			</div>

			<div className={classes["manga-preview"]}>
				<img
					src={props.selectedManga.images.jpg.image_url}
					alt={props.selectedManga.title}
					className={classes["preview-image"]}
					onError={(e) => {
						e.currentTarget.style.display = "none";
					}}
				/>

				<div className={classes["preview-info"]}>
					<h3 className={classes["preview-title"]}>{props.selectedManga.title}</h3>
					<div className={classes["preview-meta"]}>
						<span className={classes["preview-author"]}>
							<MdPerson className={classes["meta-icon"]} />
							{props.selectedManga.authors[0]?.name || "Auteur inconnu"}
						</span>
						<span className={classes["preview-volumes"]}>
							<MdAutoStories className={classes["meta-icon"]} />
							{props.selectedManga.volumes ? `${props.selectedManga.volumes} tomes` : "En cours"}
						</span>
					</div>
				</div>
			</div>

			<form onSubmit={handleProgressSubmit} className={classes["form"]}>
				<div className={classes["progress-section"]}>
					<div className={classes["progress-header"]}>
						<h4 className={classes["section-title"]}>Votre progression</h4>
						<p className={classes["section-subtitle"]}>
							{props.selectedManga?.volumes ? `Combien de tomes avez-vous lu sur ${props.selectedManga.volumes} ?` : "Combien de tomes avez-vous déjà lu ?"}
						</p>
					</div>

					<InputNumber id="current-progress" value={currentProgress} onChange={setCurrentProgress} placeholder="Nombre de tomes lus" label="" icon={MdNumbers} />
				</div>

				{error && (
					<div className={classes["error-content"]}>
						<span className={classes["error-icon"]}>⚠️</span>
						<span>{error}</span>
					</div>
				)}

				<div className={classes["actions"]}>
					<Button onClick={props.backToSearch} variant={EButtonVariant.OUTLINED}>
						Retour à la recherche
					</Button>

					<Button type="submit" variant={EButtonVariant.CONTAINED}>
						{loading ? "Ajout en cours..." : "Ajouter à ma collection"}
					</Button>
				</div>
			</form>
		</div>
	);
}
