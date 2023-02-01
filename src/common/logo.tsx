import Image from "next/image";

import styles from "@styles/logo.module.scss";

export const Logo = () => (
	<div className={styles["logo-container"]}>
		<Image className={styles.logo} src="/bigoteJossiel.png" alt="un bigote piola" fill />
	</div>
);
