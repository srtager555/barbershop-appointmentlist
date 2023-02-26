import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Loader } from "@common/Loader";
import Image from "next/image";

import styles from "@styles/Perfil.module.scss";

const Profile: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

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
