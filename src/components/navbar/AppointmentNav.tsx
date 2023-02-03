import Wl from "wrapping-letters-react";

import { ActiveLink } from "@common/ActiveLink";

import styles from "@styles/navbarComponents/AppointmentNav.module.scss";

export const AppointmentNav = () => {
	return (
		<>
			<h2>Reservas</h2>
			<div className="appointment-day">
				<ActiveLink href="citas/">Hoy</ActiveLink>
				<span className="line"></span>
				<ActiveLink href="citas/">Mañana</ActiveLink>
			</div>
			<div className="state-poster">
				<div className="state">
					<span>Esta abierto</span>
				</div>
				<div className="barber-lantern">
					<Wl
						text="ioioioioioioio"
						textOptions={{
							ClassToAdd: "lantern-bar",
							SelectClass: {
								wordToSearch: ["o", "i"],
								classToAdd: ["red", "blue"],
							},
						}}
					/>
				</div>
			</div>
		</>
	);
};
