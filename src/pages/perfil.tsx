import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Loader } from "@common/Loader";
import Image from "next/image";

import styles from "@styles/Perfil.module.scss";

const Profile: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [appointment, setAppoinment] = useState();

	useEffect(() => {
		const hasAppointment = async () =>
			await fetch("/api/appointments/userAppointment", {
				method: "POST",
				body: JSON.stringify({
					user_id: session?.user.id,
				}),
			}).then(async (data) => setAppoinment(await data.json()));

		hasAppointment();
	}, [session]);

	if (status === "loading") return <Loader />;

	if (status === "unauthenticated") router.push("/login");

	return (
		<div className={styles.container}>
			<h1>{session?.user.name}</h1>
			<p>{session?.user.phone}</p>
			<div>
				<p>{}</p>
			</div>

			<button onClick={() => signOut()}>cerrar sesión</button>
		</div>
	);
};

export default Profile;
