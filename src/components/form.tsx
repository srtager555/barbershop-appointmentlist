import { FormEvent } from "react";
import Link from "next/link";

import styles from "@styles/Form.module.scss";

const Form = ({ type, callback }: { type: "login" | "regis"; callback: Function }) => (
	<div className={`${styles.container}`}>
		<p className={styles.title}>
			{type === "login" ? (
				<>
					{"¡Inicia sesión! o "}
					<Link href="/registrar" className={styles.cta}>
						¿no tienes una cuenta?
					</Link>
				</>
			) : (
				<>
					{"¡Crea una cuenta! o"}
					<Link href="/login" className={styles.cta}>
						¿ya tienes una?
					</Link>
				</>
			)}
		</p>
		<form className={styles["form"]} onSubmit={(e: FormEvent) => callback(e)}>
			{type === "login" ? (
				""
			) : (
				<>
					<div className={styles.inputContainer}>
						<input
							className={styles.input}
							id="name"
							name="name"
							type="text"
							required
						/>
						<span className={styles.name}>Primer Nombre y Apellido</span>
					</div>
				</>
			)}
			<div className={styles.inputContainer}>
				<input className={styles.input} id="phone" name="phone" type="text" required />
				<span className={styles.name}>Tu número</span>
			</div>
			<div className={styles.inputContainer}>
				<input
					className={styles.input}
					id="password"
					name="password"
					type="password"
					required
				/>
				<span className={styles.name}>Tu contraseña</span>
			</div>
			<button className={styles["btn-action"]}>
				{type === "login" ? "Buscar cuenta" : "Crear cuenta"}
			</button>
		</form>
	</div>
);

export default Form;
