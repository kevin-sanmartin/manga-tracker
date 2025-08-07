export interface MangaTable {
	id: string;
	actualTome: number;
	totalTome: number;
	title: string;
	author: string;
	genre: string;
	created_at: string;
	coverUrl: string;
	user_id: string;
}

export interface CreateMangaInput {
	actualTome: number;
	totalTome: number;
	title: string;
	author: string;
	genre: string;
	coverUrl: string;
}

export interface UpdateMangaInput {
	actualTome?: number;
	totalTome?: number;
	title?: string;
	author?: string;
	genre?: string;
	coverUrl?: string;
}