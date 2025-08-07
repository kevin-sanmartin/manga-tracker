"use client";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import AddMangaModal from "@/components/materials/AddMangaModal";
import classes from "./classes.module.scss";

export default function FloatingAddButton() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button 
				className={classes["floating-button"]}
				onClick={() => setIsModalOpen(true)}
				aria-label="Ajouter un manga"
			>
				<MdAdd className={classes["icon"]} />
			</button>
			
			<AddMangaModal 
				isOpen={isModalOpen} 
				onClose={() => setIsModalOpen(false)} 
			/>
		</>
	);
}