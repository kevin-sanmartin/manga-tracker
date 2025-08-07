import { useCallback, useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";
import Modal from "@/components/elements/Modal";
import Input from "@/components/elements/Input";
import Button, { EButtonVariant } from "@/components/elements/Button";
import { useAuth } from "@/contexts/AuthContext";
import classes from "./classes.module.scss";

type IProps = {
	isOpen: boolean;
	onClose: () => void;
};

export default function LoginRegisterModal(props: IProps) {
	const { isLogin, email, password, loading, error, handleSubmit, toggleMode, handleClose, setEmail, setPassword } = useForm(props.onClose);

	return (
		<Modal isOpen={props.isOpen} onClose={handleClose}>
			<div className={classes["root"]}>
				<div className={classes["header"]}>
					<h2 className={classes["title"]}>{isLogin ? "Connexion" : "Inscription"}</h2>
					<p className={classes["subtitle"]}>{isLogin ? "Connectez-vous pour accéder à votre compte" : "Créez votre compte pour commencer"}</p>
				</div>

				<form onSubmit={handleSubmit} className={classes["form"]}>
					<div className={classes["inputs"]}>
						<Input id="email" type="email" value={email} onChange={setEmail} placeholder="Email" icon={MdEmail} />
						<Input id="password" type="password" value={password} onChange={setPassword} placeholder="Mot de passe" icon={MdLock} />
					</div>

					{error && <div className={classes["error"]}>{error}</div>}

					<div className={classes["actions"]}>
						<button type="submit" className={classes["submit-button"]} disabled={loading || !email || !password}>
							{loading ? "Chargement..." : isLogin ? "Se connecter" : "S'inscrire"}
						</button>
					</div>
				</form>

				<div className={classes["switch"]}>
					<span className={classes["switch-text"]}>{isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}</span>
					<Button onClick={toggleMode} variant={EButtonVariant.TEXT}>
						{isLogin ? "S'inscrire" : "Se connecter"}
					</Button>
				</div>
			</div>
		</Modal>
	);
}

const useForm = (onClose: () => void) => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const { signIn, signUp } = useAuth();

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			setLoading(true);
			setError("");

			try {
				if (isLogin) {
					await signIn(email, password);
				} else {
					await signUp(email, password);
				}
				onClose();
				setEmail("");
				setPassword("");
			} catch (err: any) {
				setError(err.message || "Une erreur est survenue");
			} finally {
				setLoading(false);
			}
		},
		[isLogin, email, password, signIn, signUp, onClose],
	);

	const toggleMode = useCallback(() => {
		setIsLogin(!isLogin);
		setError("");
	}, [isLogin]);

	const handleClose = useCallback(() => {
		onClose();
		setEmail("");
		setPassword("");
		setError("");
	}, [onClose]);

	return {
		isLogin,
		email,
		password,
		loading,
		error,
		handleSubmit,
		toggleMode,
		handleClose,
		setEmail,
		setPassword,
	};
};
