"use client";
import { useState, useCallback } from "react";
import { Manga } from "@tutkli/jikan-ts";
import Modal from "@/components/elements/Modal";
import SearchStep from "./SearchStep";
import ProgressStep from "./ProgressStep";

type IProps = {
	isOpen: boolean;
	onClose: () => void;
};

enum EStep {
	SEARCH = "search",
	PROGRESS = "progress",
}

export default function AddMangaModal(props: IProps) {
	const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
	const [step, setStep] = useState<EStep>(EStep.SEARCH);

	const handleMangaSelect = useCallback((manga: Manga) => {
		setSelectedManga(manga);
		setStep(EStep.PROGRESS);
	}, []);

	const handleBackToSearch = useCallback(() => {
		setStep(EStep.SEARCH);
		setSelectedManga(null);
	}, []);

	const handleClose = useCallback(() => {
		props.onClose();
		setStep(EStep.SEARCH);
		setSelectedManga(null);
	}, [props.onClose]);

	return (
		<Modal isOpen={props.isOpen} onClose={handleClose}>
			{step === EStep.SEARCH && <SearchStep onSelect={handleMangaSelect} onClose={handleClose} />}
			{step === EStep.PROGRESS && selectedManga && <ProgressStep selectedManga={selectedManga} onClose={handleClose} backToSearch={handleBackToSearch} />}
		</Modal>
	);
}
