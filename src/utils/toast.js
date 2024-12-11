import Swal from "sweetalert2";

const errorToast = Swal.mixin({
    customClass: {
        container:"toast",
        title:"toast_title",
        icon:"toast_icon",
        timerProgressBar:"toast_progress_error",
        popup:"toast_text"
    },
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const warningToast = Swal.mixin({
    customClass: {
        container:"toast",
        title:"toast_title",
        icon:"toast_icon",
        timerProgressBar:"toast_progress_warning",
        popup:"toast_text"
    },
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const successToast = Swal.mixin({
    customClass: {
        container:"toast",
        title:"toast_title",
        icon:"toast_icon",
        timerProgressBar:"toast_progress_success",
        popup:"toast_text"
    },
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

export {errorToast,warningToast,successToast}