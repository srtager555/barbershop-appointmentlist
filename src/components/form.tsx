import { FormEvent } from "react";
import Link from "next/link";

import styles from "@styles/Form.module.scss";

const Form = ({ type, callback }: { type: "login" | "regis"; callback: Function }) => (
	<div className={styles["form-container"]}>
		<h2>{type === "login" ? "Inicia Sesion" : "Crea una cuenta"}</h2>
		<form onSubmit={(e: FormEvent) => callback(e)}>
			<p>number</p>
			<input id="number" name="number" type="number" placeholder="+504 95873245" required />
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
	</div>
);

export default Form;
