import classes from "./classes.module.scss";
import Status, { ECardStatus } from "./Status";
import ProgressBar from "./ProgressBar";
import { FiEdit } from "react-icons/fi";
import { Fragment, useCallback, useState } from "react";
import EditCardModal from "./EditCardModal";
import { MangaTable } from "@/types/manga";

export interface CardProps {
	manga: MangaTable;
}

export default function Card(props: CardProps) {
	const { manga } = props;
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

	const toggleEditModal = useCallback(() => setIsEditModalOpen((prev) => !prev), []);

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
							<FiEdit className={classes["edit-icon"]} onClick={toggleEditModal} />
						</div>
						<ProgressBar progress={manga.actualTome} total={manga.totalTome} />
					</div>
				</div>
			</div>
			<EditCardModal isOpen={isEditModalOpen} onClose={toggleEditModal} manga={manga} />
		</Fragment>
	);
}
