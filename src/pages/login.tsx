import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

import styles from "@styles/login.module.scss"

const Login: NextPage = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const checkData = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
    
		signIn("credentials", {
			redirect: false,
			// @ts-ignore
			phoneNumber: e.currentTarget.number.value,
			// @ts-ignore
			password: e.currentTarget.password.value,
			// @ts-ignore
		}).then(({ ok, error }) => {
			setLoading(false);

			if (ok) {
				router.push("/citas");
			} else {
				console.error(error);
			}
		});
	};

	return (
		<>
			<form onSubmit={(e) => checkData(e)} className={styles["top"]}>
				<p>number</p>
				<input
					id="number"
					name="number"
					type="number"
					placeholder="+504 95873245"
					required
				/>
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
		</>
	);
};

export default Login;
