import Modal from "../Modal";
import Button, { EButtonVariant } from "../Button";
import classes from "./classes.module.scss";
import { FiAlertTriangle } from "react-icons/fi";

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmer", cancelText = "Annuler" }: ConfirmModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className={classes["root"]}>
				<div className={classes["header"]}>
					<FiAlertTriangle className={classes["icon"]} />
					<h3 className={classes["title"]}>{title}</h3>
				</div>

				<p className={classes["message"]}>{message}</p>

				<div className={classes["actions"]}>
					<Button onClick={onClose} variant={EButtonVariant.OUTLINED}>
						{cancelText}
					</Button>
					<Button onClick={onConfirm} variant={EButtonVariant.CONTAINED}>
						{confirmText}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
