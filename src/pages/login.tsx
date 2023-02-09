import { NextPage } from "next";
import { FormEvent, useState } from "react";

const Login: NextPage = () => {
	const checkData = async (e: FormEvent) => {
		e.preventDefault();

		const data = await fetch("http://localhost:3000/api/checkUser/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			//@ts-ignore
			body: JSON.stringify({ phoneNumber: Number(e.currentTarget.number.value) }),
		})

    console.log(data.json())
	};

	return (
    <>
      <form onSubmit={(e) => checkData(e)}>
        <p>number</p>
        <input id="number" name="number" type="number" placeholder="+504 95873245" required />
        {/* <p>password</p>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="tu contraseña secreta"
          required
        /> */}
        <br />
        <button>buscar data</button>
      </form>
    </>
	);
};

export default Login;
