import { Noto_Sans_Display as m } from "@next/font/google";

import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import { Loader } from "@common/Loader";
import { UserTimeBTN } from "@components/appointments/UserTime.btn";
import { handlerCloseAccount } from "@warns/dropAccount";
import { handlerSignOut } from "@warns/signOut";
import { handlerUploadUserAvatar } from "@utils/uploadUserImage";
import { supabase } from "@ddbb/supabase.client";
import Image from "next/image";
import Link from "next/link";

import stylesCitas from "@styles/citas.module.scss";
import indexStyles from "@styles/index.module.scss";
import styles from "@styles/Perfil.module.scss";

const notoI = m({ weight: ["300"], subsets: ["latin"], style: ["italic"] });

const Profile: NextPage = () => {
	const imageInputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const stateStylesItalic = `${notoI.className} ${stylesCitas.state}`;
	const { data: session, status } = useSession();
	const [appointment, setAppointment] = useState<{ data: rawAppointments; expire: boolean }>();
	const [imageURL, setImageURL] = useState("");

	function handlerChangeUserImage() {}

	// get the user data(image and appointment)
	useEffect(() => {
		if (!session) return;

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
	}, [session]);

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
	}, [imageInputRef.current?.files]);

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
						width="150"
						height="150"
						alt={`${session.user.name} - avatar`}
					/>
					<div className={styles["container--changeImage"]}>
						<span className={`${notoI.className} ${styles.title}`}>Cambiar</span>
						<input
							type="file"
							className={styles.changeImage}
							accept="image/png, image/jpeg, image/jpg, image/gif"
						/>
					</div>
				</div>
			) : (
				<>
					<div className={styles["ImageContainer"]}>
						{imageURL != "" ? (
							<Image
								src={imageURL}
								width="150"
								height="150"
								alt={`${session.user.name} - avatar`}
							/>
						) : (
							<div className={styles["fake--image"]}></div>
						)}
					</div>
					<div className={styles["image_options--upload"]}>
						<h4 className={`${notoI.className} ${styles["upload--title"]}`}>
							Sube tu foto de perfil
						</h4>
						<div className={styles.options}>
							<div className={styles["input--container"]}>
								<span className={styles.text}>Buscar imagen</span>
								<input
									ref={imageInputRef}
									type="file"
									accept="image/png, image/jpeg, image/jpg, image/gif"
								/>
							</div>
							<button
								disabled={imageURL === ""}
								className={`${notoI.className} ${indexStyles["btn-action"]} ${indexStyles["under-line"]}`}
								onClick={() => handlerUploadUserAvatar(imageInputRef, session)}
							>
								Subir
							</button>
						</div>
					</div>
				</>
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
