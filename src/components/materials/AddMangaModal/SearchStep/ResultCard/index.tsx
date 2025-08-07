import { Manga } from "@tutkli/jikan-ts";
import classes from "./classes.module.scss";
import Image from "next/image";
import { MdPerson } from "react-icons/md";

type IProps = {
	manga: Manga;
	onSelect: (manga: Manga) => void;
};

export default function ResultCard(props: IProps) {
	return (
		<div key={props.manga.mal_id} className={classes["result-item"]} onClick={() => props.onSelect(props.manga)}>
			<Image
				src={props.manga.images.jpg.image_url}
				alt={props.manga.title}
				className={classes["result-image"]}
				width={100}
				height={150}
				onError={(e) => {
					e.currentTarget.style.display = "none";
				}}
			/>

			<div className={classes["result-info"]}>
				<div className={classes["result-main"]}>
					<h4 className={classes["result-title"]}>{props.manga.title}</h4>

					<span className={classes["result-author"]}>
						<MdPerson className={classes["meta-icon"]} />
						{props.manga.authors[0]?.name || "Auteur inconnu"}
					</span>
				</div>

				<div className={classes["result-stats"]}>
					{props.manga.volumes ? <span className={classes["volume-badge"]}>{props.manga.volumes} tomes</span> : <span className={classes["status-badge"]}>En cours</span>}
					{props.manga.score && <span className={classes["score-badge"]}>⭐ {props.manga.score}</span>}
				</div>
			</div>
		</div>
	);
}
