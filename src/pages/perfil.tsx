import { Noto_Sans_Display as m } from "@next/font/google";

import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Loader } from "@common/Loader";
import { UserTimeBTN } from "@components/appointments/UserTime.btn";
import { handlerCloseAccount } from "src/utils/closeAccount";
import { handlerSignOut } from "src/utils/signOut";
import Image from "next/image";

import Link from "next/link";
import stylesCitas from "@styles/citas.module.scss";
import indexStyles from "@styles/index.module.scss";
import styles from "@styles/Perfil.module.scss";

const notoI = m({ weight: ["300"], subsets: ["latin"], style: ["italic"] });

const Profile: NextPage = () => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [appointment, setAppointment] = useState<{ data: rawAppointments; expire: boolean }>();
	const stateStylesItalic = `${notoI.className} ${stylesCitas.state}`;

	useEffect(() => {
		const hasAppointment = async () =>
			await fetch("/api/appointments/userAppointment", {
				method: "POST",
				body: JSON.stringify({
					user_id: session?.user.id,
				}),
			}).then(async (data) => {
				setAppointment(await data.json());
			});

		if (session?.user.id) hasAppointment();
	}, [session]);

	if (status === "loading") return <Loader />;

	if (status === "unauthenticated") router.push("/login");

	return (
		<div className={styles.container}>
			<h1>{session?.user.name}</h1>
			<p className={styles.number}>{session?.user.phone}</p>
			<div className={`${stylesCitas["container-appointments"]} ${stylesCitas.user}`}>
				<div className={stylesCitas["appointment-btn__container"]}>
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
						<p>¡Aun no has hecho tu primer reserva!</p>
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
				<button
					className={`${indexStyles["btn-action"]} ${indexStyles.warn}`}
					onClick={() => handlerCloseAccount(session?.user.id)}
				>
					Cerrar cuenta
				</button>
			</div>
		</div>
	);
};

export default Profile;
