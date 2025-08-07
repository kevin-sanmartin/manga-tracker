import classes from "./classes.module.scss";
import Status, { ECardStatus } from "./Status";
import ProgressBar from "./ProgressBar";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Fragment, useCallback, useState } from "react";
import EditCardModal from "./EditCardModal";
import ConfirmModal from "../ConfirmModal";
import { MangaTable } from "@/types/manga";
import { MangaService } from "@/services/MangaService";
import { useAuth } from "@/contexts/AuthContext";

export interface CardProps {
	manga: MangaTable;
	onDelete?: (mangaId: string) => void;
}

export default function Card(props: CardProps) {
	const { manga, onDelete } = props;
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const { user } = useAuth();

	const toggleEditModal = useCallback(() => setIsEditModalOpen((prev) => !prev), []);
	const toggleDeleteModal = useCallback(() => setIsDeleteModalOpen((prev) => !prev), []);

	const handleDeleteClick = useCallback(() => {
		setIsDeleteModalOpen(true);
	}, []);

	const handleDeleteConfirm = useCallback(async () => {
		if (!user) return;
		
		try {
			await MangaService.getInstance().deleteManga(user, manga.id);
			onDelete?.(manga.id);
			setIsDeleteModalOpen(false);
		} catch (error) {
			console.error("Erreur lors de la suppression:", error);
		}
	}, [user, manga.id, onDelete]);

	return (
		<Fragment>
			<div className={classes["root"]}>
				<div className={classes["image-container"]}>
					<img src={manga.coverUrl} alt={manga.title} className={classes["image"]} />
				</div>
				<div className={classes["info-container"]}>
					<div className={classes["header-container"]}>
						<div className={classes["title-container"]}>
							<h3 className={classes["title"]}>{manga.title}</h3>
							<span className={classes["author"]}>{manga.author}</span>
						</div>
						<Status status={manga.actualTome === manga.totalTome ? ECardStatus.COMPLETED : ECardStatus.IN_PROGRESS} />
					</div>
					<div className={classes["progress-section"]}>
						<div className={classes["progress-info"]}>
							<span className={classes["progress-text"]}>
								Tome: {manga.actualTome}/{manga.totalTome ? manga.totalTome : "Manga en cours"}
							</span>
							<div className={classes["icons-container"]}>
								<FiEdit className={classes["edit-icon"]} onClick={toggleEditModal} />
								<FiTrash2 className={classes["delete-icon"]} onClick={handleDeleteClick} />
							</div>
						</div>
						<ProgressBar progress={manga.actualTome} total={manga.totalTome} />
					</div>
				</div>
			</div>
			<EditCardModal isOpen={isEditModalOpen} onClose={toggleEditModal} manga={manga} />
			<ConfirmModal
				isOpen={isDeleteModalOpen}
				onClose={toggleDeleteModal}
				onConfirm={handleDeleteConfirm}
				title="Supprimer le manga"
				message={`Êtes-vous sûr de vouloir supprimer "${manga.title}" de votre bibliothèque ? Cette action est irréversible.`}
				confirmText="Supprimer"
				cancelText="Annuler"
				isDestructive={true}
			/>
		</Fragment>
	);
}
