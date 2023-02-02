import Link from "next/link";

import { Logo } from "./logo";
import { ActiveLink } from "./ActiveLink";
import { useRouter } from "next/router";

export function Navbar() {
  return (
    <nav>
      <Logo />
      <div className="custom-content">

      </div>
    </nav>
  );
}

const DateNav = () => {
  const router = useRouter()

  const ActivePathStyle = {
    color: router.asPath  "#DDD"
  } 

  return (
    <>
      <h2>Reservas</h2>
      <div className="appointment-day">
        <ActiveLink href="citas/">Hoy</ActiveLink>
        <span className="line"></span>
        <ActiveLink href="citas/">Mañana</ActiveLink>
      </div>
    </>
  )
}



