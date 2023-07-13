/* 
   Ejemplo de JavaScript para deshabilitar el envío de formularios si hay campos no válidos hecho por Bootstrap
   @link https://getbootstrap.com/docs/5.3/forms/validation/
*/

(() => {
    'use strict'

    // Obtener todos los formularios a los que queremos aplicar estilos de validación de Bootstrap personalizados
    const forms = document.querySelectorAll('.needs-validation')

    // Bucle sobre ellos y evitar el envío 
    Array.from(forms).forEach(form => {
        const cvInput = form.querySelector('#txtCV');

        cvInput.addEventListener('change', event => {
            const file = cvInput.files[0];
            const allowedExtensions = ['pdf'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                form.classList.remove('was-validated');
                cvInput.setCustomValidity('El archivo del CV debe estar en formato PDF.');
            } else {
                cvInput.setCustomValidity('');
            }
        });

        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // event.preventDefault();
                // event.stopPropagation();

                // Mostrar mensaje de éxito con SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'El formulario se ha enviado correctamente.'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Restablecer el formulario
                        form.reset();
                        form.classList.remove('was-validated');
                    }
                });
            }

            form.classList.add('was-validated');
        }, false);
    });
})();
