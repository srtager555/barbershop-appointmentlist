import { NextPage } from "next";
import { FormEvent, useState } from "react";
import Form from "@components/form";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Registrar: NextPage = () => {
	const [responce, setResponce] = useState();
	const router = useRouter();

	const SignUpHandler = async (e: FormEvent) => {
		e.preventDefault();

		const name = e.currentTarget.name.value;
		const phone = e.currentTarget.phone.value;
		const password = e.currentTarget.password.value;

		await fetch("/api/user/createAccount", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				phone,
				password,
			}),
		}).then(async (res) => {
			if (res.status === 200) {
				console.log("Account created!");
				signIn("credentials", {
					redirect: false,
					phone,
					password,
				});
				router.push("/citas/");
			} else {
				console.log(res.text());
			}
		});
	};

	return <Form type="regis" callback={SignUpHandler} />;
};

export default Registrar;
