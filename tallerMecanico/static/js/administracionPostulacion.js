document.addEventListener('DOMContentLoaded', function () {
    // Capturar los botones de "Aprobar" y "Rechazar"
    const btnAprobar = document.querySelectorAll('.btn-aprobar');
    const btnRechazar = document.querySelectorAll('.btn-rechazar');
    const csrfToken = document.querySelector("[name=csrfmiddlewaretoken]").value;
    // Agregar el evento de clic a los botones de "Aprobar"
    btnAprobar.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            const postId = event.target.getAttribute('data-id');

            // Mostrar SweetAlert de confirmación
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción aprobará la postulación.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aprobar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Realizar la solicitud AJAX al confirmar la postulación
                    fetch(`/confirmar-postulacion/${postId}/ACEPTADO/`, {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': csrfToken
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                icon: 'success',
                                title: '¡Aprobado!',
                                text: data.message
                            }).then(() => {
                                location.reload(); // Recargar la página
                            });
                        })
                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ha ocurrido un error al aprobar la postulación.'
                            });
                            console.error(error);
                        });
                }
            });
        });
    });


    // Agregar el evento de clic al botón de "Rechazar"
    btnRechazar.forEach(function (btn) {
        btn.addEventListener('click', function (event) {
            event.preventDefault();
            const postId = event.target.getAttribute('data-id');

            // Mostrar SweetAlert de confirmación
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esta acción rechazará la postulación.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Rechazar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Realizar la solicitud AJAX al confirmar la postulación
                    fetch(`/confirmar-postulacion/${postId}/RECHAZADO/`, {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': csrfToken
                        }
                    })
                        .then(response => response.json())
                        .then(data => {
                            Swal.fire({
                                icon: 'success',
                                title: '¡Rechazado!',
                                text: data.message
                            }).then(() => {
                                location.reload(); // Recargar la página
                            });
                        })
                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ha ocurrido un error al aprobar la postulación.'
                            });
                            console.error(error);
                        });
                }
            });
        });
    });
});
