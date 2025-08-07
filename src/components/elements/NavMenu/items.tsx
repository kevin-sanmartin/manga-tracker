import { TbBook } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { LuUser } from "react-icons/lu";

export const items = [
	{
		label: "Bibliothèque",
		icon: TbBook,
		href: "/",
	},
	{
		label: "Ajouter",
		icon: FaPlus,
		href: "/add",
	},
	{
		label: "Statistiques",
		icon: IoStatsChart,
		href: "/stats",
	},
	{
		label: "Profil",
		icon: LuUser,
		href: "/profile",
	},
];
