import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import { Loader } from "@common/Loader";
import { handlerCloseAccount } from "@warns/dropAccount";
import { handlerSignOut } from "@warns/signOut";
import { UserImage } from "./_UserImage";
import { UserAppointment } from "./_UserAppointment";
import { supabase } from "@ddbb/supabase.client";

import Link from "next/link";

import indexStyles from "@styles/index.module.scss";
import styles from "@styles/Perfil.module.scss";

const Profile: NextPage = () => {
	const imageInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const { data: session, status } = useSession();
	const [appointment, setAppointment] = useState<{
		data: rawAppointments | undefined | null;
		expire: boolean | undefined;
	}>({ data: undefined, expire: undefined });
	const [imageURL, setImageURL] = useState("");
	const [newImage, setNewImage] = useState("");

	function handlerChangeUserImage() {}

	// get the user data(image and appointment)
	useEffect(() => {
		if (!session || newImage != "") return;

		const UserData = async () => {
			// fetch image url
			if (typeof session.user.image === "string" && session.user.image !== "") {
				const { data, error } = await supabase.storage
					.from("user-image")
					.createSignedUrl(session.user.image, 60);

				data && setImageURL(data.signedUrl);
			}

			// fetch current appointment
			await fetch("/api/appointments/userAppointment", {
				method: "POST",
				body: JSON.stringify({
					user_id: session.user.id,
				}),
			}).then(async (data) => {
				setAppointment(await data.json());
			});
		};

		UserData();
	}, [session, newImage]);

	useEffect(() => {
		const IMAGE = imageInputRef.current?.files;
		const READER = new FileReader();

		READER.onloadend = function () {
			if (typeof READER.result === "string") {
				setImageURL(READER.result);
			} else console.log(READER.result);
		};

		if (!IMAGE || IMAGE.length === 0) return;
		READER.readAsDataURL(IMAGE[0]);
	}, [newImage]);

	if (status === "loading") return <Loader />;

	if (status === "unauthenticated" || !session) {
		router.push("/login");
		return <></>;
	}

	return (
		<div className={styles.container}>
			<UserImage
				session={session}
				imageURL={imageURL}
				newImage={newImage}
				setNewImage={setNewImage}
				imageInputRef={imageInputRef}
			/>
			<h1>{session.user.name}</h1>
			<p className={styles.number}>{session.user.phone}</p>
			{session.user.role === "admin" && (
				<small className={styles.message}>Eres administrador</small>
			)}
			<UserAppointment appointment={appointment} />
			<Link href="/citas">
				{appointment.expire ? "Regresar a las reservas" : "Regresar a inicio a reservar"}
			</Link>
			<div className={styles["btn-container"]}>
				<button className={indexStyles["btn-action"]} onClick={handlerSignOut}>
					Cerrar sesión
				</button>
				{session ? (
					<button
						className={`${indexStyles["btn-action"]} ${indexStyles.warn}`}
						onClick={() => handlerCloseAccount(session.user.id)}
					>
						Cerrar cuenta
					</button>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Profile;
