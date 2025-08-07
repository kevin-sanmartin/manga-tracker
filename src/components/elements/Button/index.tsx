import { PropsWithChildren } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

export enum EButtonVariant {
	CONTAINED = "contained",
	OUTLINED = "outlined",
	TEXT = "text",
}

type IProps = PropsWithChildren<{
	onClick?: () => void;
	variant?: EButtonVariant;
	type?: "button" | "submit";
	className?: string;
}>;

export default function Button(props: IProps) {
	const variant = props.variant || EButtonVariant.CONTAINED;

	return (
		<button className={classNames(classes["root"], classes[variant], props.className)} onClick={props.onClick} type={props.type || "button"}>
			{props.children}
		</button>
	);
}
