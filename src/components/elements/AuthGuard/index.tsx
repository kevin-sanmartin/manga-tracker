"use client";
import { PropsWithChildren, useCallback, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginRegisterModal from "@/components/materials/LoginRegisterModal";
import classes from "./classes.module.scss";
import Button from "../Button";

type IProps = PropsWithChildren<{}>;

export default function AuthGuard(props: IProps) {
	const { user, loading } = useAuth();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openLoginModal = useCallback(() => setIsModalOpen(true), []);
	const closeLoginModal = useCallback(() => setIsModalOpen(false), []);

	if (loading) {
		return (
			<div className={classes["loading"]}>
				<div className={classes["spinner"]} />
				<p>Chargement...</p>
			</div>
		);
	}

	if (!user) {
		return (
			<div className={classes["auth-required"]}>
				<div className={classes["content"]}>
					<h1 className={classes["title"]}>Manga Tracker</h1>
					<p className={classes["subtitle"]}>Connectez-vous pour accéder à votre bibliothèque de mangas</p>
					<Button onClick={openLoginModal}>Se connecter</Button>
				</div>
				<LoginRegisterModal isOpen={isModalOpen} onClose={closeLoginModal} />
			</div>
		);
	}

	return <>{props.children}</>;
}
