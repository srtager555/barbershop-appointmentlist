import { FormEvent } from "react";
import Link from "next/link";

import styles from "@styles/Form.module.scss";

const Form = ({ type, callback }: { type: "login" | "regis"; callback: Function }) => (
	<>
		<h2 className={styles.title}>{type === "login" ? "Inicia Sesion" : "Crea una cuenta"}</h2>
		<form className={styles["form"]} onSubmit={(e: FormEvent) => callback(e)}>
			{type === "login" ? (
				""
			) : (
				<>
					<p>Ingreda tu nombre</p>
					<input id="name" name="name" type="text" required />
				</>
			)}
			<p>number</p>
			<input id="phone" name="phone" type="text" placeholder="+504 95873245" required />
			<p>password</p>
			<input
				id="password"
				name="password"
				type="password"
				placeholder="tu contraseña secreta"
				required
			/>
			<br />
			<button>buscar data</button>
		</form>
		<Link href={type === "login" ? "/registrar" : "/login"}>
			{type === "login" ? "Crear cuenta" : "¿Ya tienes una cuenta?"}
		</Link>
	</>
);

export default Form;
