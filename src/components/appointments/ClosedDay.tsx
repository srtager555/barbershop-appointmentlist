import Link from "next/link"

export default function ClosedDay() {
  return (
    <div className="container">
      <p>¡Hoy esta cerrado!</p>

      <Link href="/citas/depues">Puedes recervar en otra ocasión</Link>
    </div>
  )
}