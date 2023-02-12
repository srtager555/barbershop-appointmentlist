import { NextPage } from "next";
import { FormEvent, useState } from "react";
import Form from "@components/form";

const Registrar: NextPage = () => {
	const [responce, setResponce] = useState();

	const SignUpHandler = async (e: FormEvent) => {
		e.preventDefault();

		fetch("/api/auth/register", {
			method: "POST",
			mode: 'no-cors',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: e.currentTarget.name.value,
				phoneNumber: e.currentTarget.phone.value,
				password: e.currentTarget.password.value,
			}),
		}).then(async (res) => {
			if (res.status === 200) {
				console.log("Account created!");
			} else {
				console.log(await res.text());
			}
		});
	};

	return <Form type="regis" callback={SignUpHandler} />;
};

export default Registrar;
