import { Manga, MangaClient } from "@tutkli/jikan-ts";

export default class JikanService {
	private static instance: JikanService;
	private mangaClient: MangaClient;

	constructor() {
		this.mangaClient = new MangaClient();
	}

	public static getInstance(): JikanService {
		if (!JikanService.instance) {
			JikanService.instance = new JikanService();
		}
		return JikanService.instance;
	}

	public async searchManga(query: string, limit: number = 5): Promise<Manga[]> {
		if (!query.trim()) {
			return [];
		}

		try {
			const response = await this.mangaClient.getMangaSearch({
				q: query,
				limit: limit,
			});
			return response.data || [];
		} catch (error) {
			console.error("Error fetching manga search results:", error);
			throw error;
		}
	}

	public async getMangaDetailsFull(mangaId: number): Promise<Manga> {
		try {
			const response = await this.mangaClient.getMangaFullById(mangaId);
			return response.data;
		} catch (error) {
			console.error("Error fetching manga details:", error);
			throw error;
		}
	}
}
