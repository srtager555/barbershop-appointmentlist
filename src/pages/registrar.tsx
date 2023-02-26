import { NextPage } from "next";
import { FormEvent, useState } from "react";
import Form from "@components/form";
import { useRouter } from "next/router";

const Registrar: NextPage = () => {
	const [responce, setResponce] = useState();
	const router = useRouter();

	const SignUpHandler = async (e: FormEvent) => {
		e.preventDefault();

		await fetch("/api/createAccount", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: e.currentTarget.name.value,
				phone: e.currentTarget.phone.value,
				password: e.currentTarget.password.value,
			}),
		}).then(async (res) => {
			if (res.status === 200) {
				console.log("Account created!");
				router.push("/citas/");
			} else {
				console.log(res.text());
			}
		});
	};

	return <Form type="regis" callback={SignUpHandler} />;
};

export default Registrar;
