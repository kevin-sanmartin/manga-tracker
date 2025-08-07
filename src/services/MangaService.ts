import { supabase } from "@/utils/supabase";
import type { MangaTable, CreateMangaInput, UpdateMangaInput } from "@/types/manga";
import type { User } from "@supabase/supabase-js";

export class MangaService {
	private static instance: MangaService;
	private readonly tableName = "mangas";

	private constructor() {}

	public static getInstance(): MangaService {
		if (!MangaService.instance) {
			MangaService.instance = new MangaService();
		}
		return MangaService.instance;
	}

	public async createManga(user: User, mangaData: CreateMangaInput): Promise<MangaTable> {
		const { data, error } = await supabase
			.from(this.tableName)
			.insert({
				...mangaData,
				user_id: user.id,
			})
			.select()
			.single();

		if (error) {
			console.error("Erreur lors de la création du manga:", error);
			throw new Error(`Impossible de sauvegarder le manga: ${error.message}`);
		}

		return data;
	}

	public async getUserMangas(user: User): Promise<MangaTable[]> {
		const { data, error } = await supabase.from(this.tableName).select("*").eq("user_id", user.id).order("created_at", { ascending: false });

		if (error) {
			console.error("Erreur lors de la récupération des mangas:", error);
			throw new Error(`Impossible de récupérer les mangas: ${error.message}`);
		}

		return data || [];
	}

	public async updateManga(user: User, mangaId: string, updates: UpdateMangaInput): Promise<MangaTable> {
		const { data, error } = await supabase.from(this.tableName).update(updates).eq("id", mangaId).eq("user_id", user.id).select().single();

		if (error) {
			console.error("Erreur lors de la mise à jour du manga:", error);
			throw new Error(`Impossible de mettre à jour le manga: ${error.message}`);
		}

		return data;
	}

	public async deleteManga(user: User, mangaId: string): Promise<void> {
		const { error } = await supabase.from(this.tableName).delete().eq("id", mangaId).eq("user_id", user.id);

		if (error) {
			console.error("Erreur lors de la suppression du manga:", error);
			throw new Error(`Impossible de supprimer le manga: ${error.message}`);
		}
	}

	public async getMangaById(user: User, mangaId: string): Promise<MangaTable | null> {
		const { data, error } = await supabase.from(this.tableName).select("*").eq("id", mangaId).eq("user_id", user.id).single();

		if (error) {
			if (error.code === "PGRST116") {
				return null; // Pas trouvé
			}
			console.error("Erreur lors de la récupération du manga:", error);
			throw new Error(`Impossible de récupérer le manga: ${error.message}`);
		}

		return data;
	}

	public async checkIfMangaExists(user: User, title: string): Promise<boolean> {
		const { data, error } = await supabase.from(this.tableName).select("id").eq("user_id", user.id).eq("title", title).maybeSingle();

		if (error) {
			console.error("Erreur lors de la vérification d'existence du manga:", error);
			return false;
		}

		return data !== null;
	}
}
