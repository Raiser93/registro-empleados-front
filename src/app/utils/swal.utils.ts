import Swal from "sweetalert2";

export class SwalUtils {
    static swalEmployeeCreated(employee: string) {
        return Swal.fire({
            title: 'Empleado se ha creado',
            html: `
                <p class="m-0">El empleado: ${employee}</p>
                <p class="m-0">Se ha creado correctamente</p>
            `,
            icon: 'success',
        });
    }

    static swalToast({message, icon}) {
        return Swal.fire({
            toast: true,
            position: 'bottom-end',
            timer: 3000,
            timerProgressBar: false,
            icon,
            title: message,
            showConfirmButton: false
        })
    }

    static userExeption({title, message, icon, error, origin}) {
        console.error(error);
        console.warn(origin);
        return Swal.fire(title, message, icon);
    }

    static confirmSwal({title, confirmButtonText, cancelButtonText}) {
        return Swal.fire({
            title,
            showCancelButton: true,
            confirmButtonText,
            cancelButtonText
        })
    }

    static waitingMessage({message}) {
        return Swal.fire({
            title: message,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            willOpen: () => {
                Swal.showLoading();
            },
        })
    }

    static forceClosingSwal() {
        return Swal.close();
    }
}