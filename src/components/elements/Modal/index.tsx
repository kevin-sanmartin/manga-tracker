import { PropsWithChildren } from "react";
import classes from "./classes.module.scss";

type IProps = PropsWithChildren<{
	isOpen: boolean;
	onClose: () => void;
}>;

export default function Modal(props: IProps) {
	if (!props.isOpen) {
		return null;
	}

	return (
		<div className={classes["root"]}>
			<div className={classes["overlay"]} onClick={props.onClose} />
			<div className={classes["content"]}>{props.children}</div>
		</div>
	);
}
