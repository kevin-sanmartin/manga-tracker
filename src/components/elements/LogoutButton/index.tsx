"use client";
import { useCallback, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "@/contexts/AuthContext";
import ConfirmModal from "../ConfirmModal";
import classes from "./classes.module.scss";

export default function LogoutButton() {
	const { signOut } = useAuth();
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

	const handleLogoutClick = useCallback(() => {
		setIsConfirmModalOpen(true);
	}, []);

	const handleLogoutConfirm = useCallback(async () => {
		try {
			await signOut();
			setIsConfirmModalOpen(false);
		} catch (error) {
			console.error("Erreur lors de la déconnexion:", error);
		}
	}, [signOut]);

	const handleCloseModal = useCallback(() => {
		setIsConfirmModalOpen(false);
	}, []);

	return (
		<>
			<button className={classes["logout-button"]} onClick={handleLogoutClick} aria-label="Se déconnecter" title="Se déconnecter">
				<FiLogOut className={classes["icon"]} />
			</button>

			<ConfirmModal
				isOpen={isConfirmModalOpen}
				onClose={handleCloseModal}
				onConfirm={handleLogoutConfirm}
				title="Se déconnecter"
				message="Êtes-vous sûr de vouloir vous déconnecter ?"
				confirmText="Se déconnecter"
				cancelText="Annuler"
			/>
		</>
	);
}
