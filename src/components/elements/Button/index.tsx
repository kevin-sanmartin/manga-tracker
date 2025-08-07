import { PropsWithChildren } from "react";
import classes from "./classes.module.scss";

export enum EButtonVariant {
	CONTAINED = "contained",
	OUTLINED = "outlined",
	TEXT = "text",
}

type IProps = PropsWithChildren<{
	onClick?: () => void;
	variant?: EButtonVariant;
	type?: "button" | "submit";
}>;

export default function Button(props: IProps) {
	const variant = props.variant || EButtonVariant.CONTAINED;

	return (
		<button className={`${classes["root"]} ${classes[variant]}`} onClick={props.onClick} type={props.type || "button"}>
			{props.children}
		</button>
	);
}
