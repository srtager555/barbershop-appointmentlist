import React, { useState } from "react";
import { Logo } from "./logo";
import { ActiveLink } from "./ActiveLink";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface ComponentsList {
  path: string;
  component: () => JSX.Element
}

export function Navbar() {
  const router = useRouter()

  const [Nav, setNav] = useState<{ component: () => JSX.Element }>({component: AppointmentContent })

  useEffect(() => {
    const content: Array<ComponentsList> = [{ path: "citas/", component: AppointmentContent}]

    const newContent = content.find((element) => element.path === router.asPath)

    if (newContent) {
      setNav({ component: newContent.component})
    }
  }, [router.asPath])

  return (
    <nav>
      <Logo />
      <div className="custom-content">
        { Nav.component() }
      </div>
    </nav>
  );
}

const AppointmentContent = () => {
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



