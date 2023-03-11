import { Noto_Sans_Display as m } from "@next/font/google";
import { RefObject } from "react";
import { Session } from "next-auth/core/types";

import { handlerUploadUserAvatar } from "@utils/uploadUserImage";

import Image from "next/image";

import styles from "@styles/Perfil.module.scss";
import indexStyles from "@styles/index.module.scss";

const notoI = m({ weight: ["300"], subsets: ["latin"], style: ["italic"] });

interface UserImageProps {
	session: Session;
	imageURL: string;
	imageInputRef: RefObject<HTMLInputElement>;
}

export function UserImage({ session, imageURL, imageInputRef }: UserImageProps) {
	return session.user.image != "" ? (
		<div className={styles.ImageContainer}>
			<Image src={imageURL} width="150" height="150" alt={`${session.user.name} - avatar`} />
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
	);
}
