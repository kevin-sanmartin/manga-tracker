import classes from "./classes.module.scss";

export interface ProgressBarProps {
	progress: number;
	total: number;
}

export default function ProgressBar(props: ProgressBarProps) {
	const { progress, total } = props;

	const percentage = Math.min(100, Math.max(0, (progress / total) * 100));

	return (
		<div className={classes["root"]}>
			<div
				className={classes["progress-bar-container"]}
				role="progressbar"
				aria-valuenow={progress}
				aria-valuemin={0}
				aria-valuemax={total}
				aria-label={`Progress: ${progress} out of ${total}`}>
				<div
					className={classes["progress-bar"]}
					style={{
						width: `${percentage}%`,
					}}
				/>
			</div>
			<span className={classes["progress-percentage"]}>{`${Math.round(percentage)}%`}</span>
		</div>
	);
}
