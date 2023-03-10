import { Noto_Sans_Display as m } from "@next/font/google";

import { useRef } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Loader } from "@common/Loader";
import { UserTimeBTN } from "@components/appointments/UserTime.btn";
import { handlerCloseAccount } from "@warns/dropAccount";
import { handlerSignOut } from "@warns/signOut";
import Image from "next/image";

import Link from "next/link";
import stylesCitas from "@styles/citas.module.scss";
import indexStyles from "@styles/index.module.scss";
import styles from "@styles/Perfil.module.scss";
import { handlerUploadUserAvatar } from "@utils/uploadUserImage";
import { supabase } from "@ddbb/supabase.client";

const notoI = m({ weight: ["300"], subsets: ["latin"], style: ["italic"] });

const Profile: NextPage = () => {
	const imageInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const stateStylesItalic = `${notoI.className} ${stylesCitas.state}`;
	const { data: session, status } = useSession();
	const [appointment, setAppointment] = useState<{ data: rawAppointments; expire: boolean }>();
	const [imageURL, setImageURL] = useState("");

	useEffect(() => {
		if (!session) return;

		const UserData = async () => {
			if (session.user.image != null) {
				const { data, error } = await supabase.storage
					.from("user-image")
					.createSignedUrl(session.user.image, 60);

				data && setImageURL(data.signedUrl);
			}

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
	}, [session]);

	if (status === "loading") return <Loader />;

	if (status === "unauthenticated" || !session) {
		router.push("/login");
		return <></>;
	}

	return (
		<div className={styles.container}>
			{session.user.image != "" ? (
				<div className={styles.ImageContainer}>
					<Image
						src={imageURL}
						width="100"
						height="100"
						alt={`${session.user.name} - avatar`}
					/>
				</div>
			) : (
				<div>
					<input
						ref={imageInputRef}
						type="file"
						accept="image/png, image/jpeg, image/gif"
					/>
					<button onClick={() => handlerUploadUserAvatar(imageInputRef, session)}>
						testing
					</button>
				</div>
			)}
			<h1>{session.user.name}</h1>
			<p className={styles.number}>{session.user.phone}</p>
			{session.user.role === "admin" && (
				<small className={styles.message}>Eres administrador</small>
			)}
			<div className={`${stylesCitas["container-appointments"]} ${stylesCitas.profile}`}>
				<div
					className={`${stylesCitas["appointment-btn__container"]} ${stylesCitas.profile}`}
				>
					{appointment?.data ? (
						<>
							{!appointment?.expire ? (
								<p>Esta es tu reserva, ¡será pronto!</p>
							) : (
								<p>¡Ya paso, se vencio tu reserva!</p>
							)}
							<UserTimeBTN
								time={appointment.data.time}
								stateStyles={stateStylesItalic}
								date={appointment.data.date}
							/>
						</>
					) : (
						<p>¡Aun no has hecho una reserva!</p>
					)}
				</div>
			</div>
			<Link href="/citas">
				{!appointment?.expire ? "Regresar a las reservas" : "Regresar a inicio a reservar"}
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
