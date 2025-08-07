import { useCallback, useState } from "react";
import classes from "./classes.module.scss";
import { IconType } from "react-icons";
import classNames from "classnames";

type IProps = {
	id: string;
	value: number;
	onChange: (value: number) => void;
	placeholder?: string;
	label?: string;
	icon?: IconType;
	inputClassName?: string;
};

export default function InputNumber(props: IProps) {
	const [isFocused, setIsFocused] = useState(false);

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			props.onChange(Number(e.target.value));
		},
		[props.onChange],
	);

	const toggleFocus = useCallback(() => {
		setIsFocused((prev) => !prev);
	}, []);

	return (
		<div className={classes["root"]}>
			{props.label && <label htmlFor={props.id}>{props.label}</label>}
			<div className={classNames(classes["input-container"], props.inputClassName, { [classes["focused"]]: isFocused })}>
				{props.icon && <props.icon className={classes["icon"]} />}
				<input
					id={props.id}
					type="number"
					value={props.value}
					onChange={onChange}
					placeholder={props.placeholder}
					className={classes["input"]}
					onFocus={toggleFocus}
					onBlur={toggleFocus}
				/>
			</div>
		</div>
	);
}
