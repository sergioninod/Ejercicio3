/**
 * Talento Tech Oriente - Basic Script
 * Contains form validation and UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form fields
            const nombre = document.getElementById('nombre');
            const documento = document.getElementById('documento');
            const correo = document.getElementById('correo');
            const celular = document.getElementById('celular');
            const nivelEducativo = document.getElementById('nivel-educativo');
            const direccion = document.getElementById('direccion');
            const departamento = document.getElementById('departamento');
            const municipio = document.getElementById('municipio');
            const bootcampInteres = document.getElementById('bootcamp-interes');

            // Error elements
            const errorNombre = document.getElementById('error-nombre');
            const errorDocumento = document.getElementById('error-documento');
            const errorCorreo = document.getElementById('error-correo');
            const errorCelular = document.getElementById('error-celular');
            const errorNivelEducativo = document.getElementById('error-nivel-educativo');
            const errorDireccion = document.getElementById('error-direccion');
            const errorDepartamento = document.getElementById('error-departamento');
            const errorMunicipio = document.getElementById('error-municipio');
            const errorBootcampInteres = document.getElementById('error-bootcamp-interes');

            let isValid = true;

            const validateField = (field, errorElement) => {
                if (field.value.trim() === '') {
                    errorElement.style.display = 'block';
                    field.style.borderColor = '#e53e3e';
                    return false;
                } else {
                    errorElement.style.display = 'none';
                    field.style.borderColor = 'var(--border-color)';
                    return true;
                }
            };

            // Validation Logic
            if (!validateField(nombre, errorNombre)) isValid = false;
            if (!validateField(documento, errorDocumento)) isValid = false;

            // Email Validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (correo.value.trim() === '' || !emailRegex.test(correo.value)) {
                errorCorreo.style.display = 'block';
                correo.style.borderColor = '#e53e3e';
                isValid = false;
            } else {
                errorCorreo.style.display = 'none';
                correo.style.borderColor = 'var(--border-color)';
            }

            if (!validateField(celular, errorCelular)) isValid = false;
            if (!validateField(nivelEducativo, errorNivelEducativo)) isValid = false;
            if (!validateField(direccion, errorDireccion)) isValid = false;
            if (!validateField(departamento, errorDepartamento)) isValid = false;
            if (!validateField(municipio, errorMunicipio)) isValid = false;
            if (!validateField(bootcampInteres, errorBootcampInteres)) isValid = false;

            // If form is valid
            if (isValid) {
                const submitBtn = contactForm.querySelector('button');
                const originalText = submitBtn.textContent;

                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;

                // Send form data to Formspree
                const formData = new FormData(contactForm);

                fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            alert('¡Gracias por contactarnos, ' + nombre.value + '! Tu mensaje ha sido enviado correctamente. Pronto nos pondremos en contacto contigo.');
                            contactForm.reset();
                        } else {
                            alert('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
                        }
                    })
                    .catch(error => {
                        alert('Hubo un error en la conexión. Por favor, revisa tu internet.');
                    })
                    .finally(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    });
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });
});
