import { JSX, ReactNode } from "react";
import classes from "./classes.module.scss";
import classNames from "classnames";

interface ContainerProps {
	children: ReactNode;
	background?: "white" | "orange" | "transparent";
	boxShadow?: boolean;
	className?: string;
	as?: keyof JSX.IntrinsicElements;
	scrollable?: boolean;
}

export default function Container({ children, background = "transparent", className, as: Component = "div", boxShadow, scrollable }: ContainerProps) {
	return (
		<Component className={classNames(classes["root"], classes[`background-${background}`], { [classes["box-shadow"]]: boxShadow, [classes["scrollable"]]: scrollable })}>
			<div className={classNames(classes["content"], className)}>{children}</div>
		</Component>
	);
}
