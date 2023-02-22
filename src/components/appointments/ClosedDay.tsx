import Link from "next/link"

import styles from "@styles/closed.module.scss"

export default function ClosedDay() {
  return (
    <div className={styles.container}>
      <h2 className={styles["closed-title"]}>¡Hoy esta cerrado!</h2>

      <Link href="/citas/despues" className={styles["cta-link"]}>¡Haz una reservar para después!</Link>
    </div>
  )
}