import { signOut } from "next-auth/react";

import Swal from "sweetalert2";

export const handlerSignOut = () => {
	Swal.fire({
		title: "¡Ojo!",
		text: "Cerraras la sesión actual",
		icon: "warning",
		confirmButtonText: "Cerrar",
		showCancelButton: true,
		cancelButtonText: "Mejor no...",
	}).then((data) => {
		if (data.isConfirmed) signOut();
	});
};
