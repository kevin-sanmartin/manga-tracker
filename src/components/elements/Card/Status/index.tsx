import classNames from "classnames";
import classes from "./classes.module.scss";
import { useCallback } from "react";

export enum ECardStatus {
	IN_PROGRESS = "in-progress",
	COMPLETED = "completed",
}

type IProps = {
	status: ECardStatus;
};

export default function Status(props: IProps) {
	const getText = useCallback(() => {
		switch (props.status) {
			case ECardStatus.IN_PROGRESS:
				return "En cours";
			case ECardStatus.COMPLETED:
				return "Terminé";
			default:
				return "";
		}
	}, [props.status]);

	return <div className={classNames(classes["root"], classes[props.status])}>{getText()}</div>;
}
