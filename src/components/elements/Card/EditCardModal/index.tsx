import { useCallback, useState } from "react";
import InputNumber from "../../InputNumber";
import Modal from "../../Modal";
import classes from "./classes.module.scss";
import Button, { EButtonVariant } from "../../Button";
import { MangaService } from "@/services/MangaService";
import { useAuth } from "@/contexts/AuthContext";
import { MangaTable } from "@/types/manga";

type IProps = {
	isOpen: boolean;
	onClose: () => void;
	manga: MangaTable;
};

export default function EditCardModal(props: IProps) {
	const [updatedTomeValue, setUpdatedTomeValue] = useState(props.manga.actualTome);
	const [error, setError] = useState<string | null>(null);
	const { user } = useAuth();

	const onTomeChange = useCallback((value: number) => {
		if (!isNaN(value)) {
			setUpdatedTomeValue(value);
		} else {
			setError("Veuillez entrer un nombre valide.");
		}
	}, []);

	const isValidTome = useCallback(() => {
		if (updatedTomeValue < 1) {
			setError(`Le numéro du tome doit être supérieur ou égal à 1.`);
			return false;
		}
		if (props.manga.totalTome && updatedTomeValue > props.manga.totalTome) {
			setError(`Le numéro du tome ne peut pas être supérieur au nombre total de tomes (${props.manga.totalTome}).`);
			return false;
		}
		setError(null);
		return true;
	}, [updatedTomeValue, props.manga.totalTome]);

	const onClose = useCallback(() => {
		setUpdatedTomeValue(props.manga.actualTome);
		setError(null);
		props.onClose();
	}, [props.manga.actualTome, props.onClose]);

	const onSave = useCallback(() => {
		if (!user) return;
		if (isValidTome()) {
			MangaService.getInstance()
				.updateManga(user, props.manga.id, {
					...props.manga,
					actualTome: updatedTomeValue,
				})
				.then(props.onClose)
				.catch(console.error);
		}
	}, [isValidTome, updatedTomeValue, props.manga, user]);

	return (
		<Modal isOpen={props.isOpen} onClose={props.onClose}>
			<div className={classes["root"]}>
				<div className={classes["title-container"]}>
					<h3>Modifier le tome</h3>
					<p className={classes["title"]}>{props.manga.title}</p>
				</div>
				<div className={classes["input-container"]}>
					<p className={classes["input-text"]}>Tome actuel :</p>
					<div className={classes["tome-container"]}>
						<InputNumber placeholder="Entrer le numéro du tome" id="tome" onChange={onTomeChange} value={updatedTomeValue} inputClassName={classes["input"]} />
						<p className={classes["input-text"]}>/ {props.manga.totalTome ? props.manga.totalTome : "Manga en cours"}</p>
					</div>
				</div>
				{error && <span className={classes["error"]}>{error}</span>}

				<div className={classes["button-container"]}>
					<Button onClick={onClose} variant={EButtonVariant.OUTLINED}>
						Annuler
					</Button>
					<Button onClick={onSave} variant={EButtonVariant.CONTAINED}>
						Enregistrer
					</Button>
				</div>
			</div>
		</Modal>
	);
}
