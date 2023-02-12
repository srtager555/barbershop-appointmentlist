import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

import styles from "@styles/login.module.scss"
import Form from "@components/form";

const Login: NextPage = () => {
	const [loading, setLoading] = useState(false);
	const [errorChecker, setErrorChecker] = useState({ ok: true, error: "" })
	const router = useRouter();

	const checkData = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);
    
		signIn("credentials", {
			redirect: false,
			// @ts-ignore
			phoneNumber: e.currentTarget.phone.value,
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
		<div className={`${styles.container} ${loading ? styles.laoding : ""}`}>
			<Form type="login" callback={checkData} />
			
		</div>
	);
};

export default Login;
