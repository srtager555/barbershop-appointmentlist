import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

import styles from "@styles/login.module.scss"
import Form from "@components/form";

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
		<Form type="login" callback={checkData} />
	);
};

export default Login;
