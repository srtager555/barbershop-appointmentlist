import Swal from "sweetalert2";

export function AdminDropAppointmentWarn() {
	return Swal.fire({
		title: "¡Advertencia!",
		icon: "warning",
		text: "La acción de cancelar una reserva no se puede deshacer, ¿Estas seguro de cancelar la cita?",
		showCancelButton: true,
		cancelButtonText: "¡Mejor no!",
		cancelButtonColor: "blue",
		confirmButtonText: "Cancelar cita",
		confirmButtonColor: "#f80000",
	}).then((data) => data.isConfirmed);
}
