import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Form from "@components/form";

const Registrar: NextPage = () => {
  return <Form type="regis" callback={() => console.log("A")} />
}

export default Registrar