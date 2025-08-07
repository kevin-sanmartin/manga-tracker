"use client";
import classes from "./classes.module.scss";
import { items } from "./items";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import Container from "../Container";

export default function NavMenu() {
	const pathname = usePathname();

	return (
		<Container as="nav" background="white" boxShadow className={classes["root"]}>
			<ul className={classes["menu"]}>
				{items.map((item) => (
					<li key={item.label} className={classes["item"]}>
						<Link
							href={item.href}
							className={classNames(classes["link"], {
								[classes["active"]]: pathname === item.href,
							})}>
							<item.icon className={classes["icon"]} />
							<span className={classes["label"]}>{item.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</Container>
	);
}
