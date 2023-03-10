import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

export const handlerCloseAccount = (user_id: user_id) => {
	if (!user_id) Swal.fire("Error", "paso algo y no se logró la operación", "error");

	Swal.fire({
		title: "Advertencia",
		icon: "warning",
		text: "La acción de eliminar tu cuenta no se puede deshacer, se eliminará todo relacionado con ella, ¿ESTAS SEGURO?",
		showConfirmButton: true,
		confirmButtonText: "BORRAR",
		confirmButtonColor: "#f80000",
		showCancelButton: true,
		cancelButtonText: "Cancelar",
	}).then(async (data) => {
		if (!data.isConfirmed) return;

		await fetch("/api/user/dropAccount", {
			method: "POST",
			body: JSON.stringify({ user_id }),
		}).then((data) => {
			if (data.ok) {
				signOut();
			}
		});
	});
};
