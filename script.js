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

    // --- Supabase Comments Logic ---
    const supabaseUrl = 'https://angmbcydeeoscceiadkf.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZ21iY3lkZWVvc2NjZWlhZGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxOTMxMTYsImV4cCI6MjA4ODc2OTExNn0.Ivn9qZ2e4HVN_bv1zt32QAUOPc7lNHfZqM6AsvepK8U';
    const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

    // Auth Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const authMessage = document.getElementById('auth-message');
    const userStatus = document.getElementById('user-status');
    const userEmailSpan = document.getElementById('user-email');
    const loginHeaderBtn = document.getElementById('loginHeaderBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Tab Switching Logic
    if (tabLogin && tabRegister) {
        tabLogin.addEventListener('click', () => {
            tabLogin.classList.add('active');
            tabRegister.classList.remove('active');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            authMessage.style.display = 'none';
        });

        tabRegister.addEventListener('click', () => {
            tabRegister.classList.add('active');
            tabLogin.classList.remove('active');
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
            authMessage.style.display = 'none';
        });
    }

    // Auth Message Helper
    const showAuthMessage = (msg, type) => {
        authMessage.textContent = msg;
        authMessage.className = `auth-message ${type}`;
        authMessage.style.display = 'block';
    };

    // Update UI based on User
    const updateAuthUI = (user) => {
        const commentForm = document.getElementById('commentForm');
        const commentLoginPromo = document.getElementById('comment-login-promo');

        if (user) {
            userEmailSpan.textContent = user.email;
            userStatus.classList.remove('user-status-hidden');
            loginHeaderBtn.style.display = 'none';
            
            // Show comment form, hide promo
            if (commentForm) commentForm.classList.remove('hidden');
            if (commentLoginPromo) commentLoginPromo.classList.add('hidden');

            // Pre-fill comment name if possible
            const commentNameInput = document.getElementById('comment-name');
            if (commentNameInput && !commentNameInput.value) {
                commentNameInput.value = user.email.split('@')[0];
            }
        } else {
            userStatus.classList.add('user-status-hidden');
            loginHeaderBtn.style.display = 'inline-block';

            // Hide comment form, show promo
            if (commentForm) commentForm.classList.add('hidden');
            if (commentLoginPromo) commentLoginPromo.classList.remove('hidden');
        }
    };

    // Register Handler
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;
            const submitBtn = registerForm.querySelector('button');

            if (password !== confirmPassword) {
                showAuthMessage('Las contraseñas no coinciden.', 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Registrando...';

            try {
                const { data, error } = await _supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: 'https://sergioninod.github.io/Ejercicio3/'
                    }
                });

                if (error) throw error;

                if (data.user && data.session) {
                    showAuthMessage('¡Registro exitoso! Redirigiendo...', 'success');
                    setTimeout(() => {
                        window.location.href = 'https://sergioninod.github.io/Ejercicio3/';
                    }, 1500);
                } else if (data.user) {
                    showAuthMessage('Registro exitoso. Por favor revisa tu correo para confirmar tu cuenta.', 'success');
                }
            } catch (error) {
                showAuthMessage(error.message, 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Registrarse';
            }
        });
    }

    // Login Handler
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const submitBtn = loginForm.querySelector('button');

            submitBtn.disabled = true;
            submitBtn.textContent = 'Ingresando...';

            try {
                const { data, error } = await _supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error) throw error;

                showAuthMessage('¡Bienvenido!', 'success');
                updateAuthUI(data.user);
            } catch (error) {
                showAuthMessage(error.message, 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Ingresar';
            }
        });
    }

    // Logout Handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            await _supabase.auth.signOut();
            updateAuthUI(null);
            showAuthMessage('Sesión cerrada.', 'success');
        });
    }

    // Check Initial Session
    const checkSession = async () => {
        const { data: { session } } = await _supabase.auth.getSession();
        updateAuthUI(session?.user ?? null);
    };

    // Listen for Auth Changes
    _supabase.auth.onAuthStateChange((event, session) => {
        updateAuthUI(session?.user ?? null);
    });

    checkSession();

    // --- Comments Logic ---
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('comments-list');

    // Function to load comments
    async function loadComments() {
        commentsList.innerHTML = '<div class="loading">Cargando comentarios...</div>';
        
        try {
            const { data, error } = await _supabase
                .from('comments')
                .select('*')
                .order('fecha', { ascending: false });

            if (error) throw error;

            if (data.length === 0) {
                commentsList.innerHTML = '<div class="no-comments">No hay comentarios aún. ¡Sé el primero en comentar!</div>';
                return;
            }

            commentsList.innerHTML = '';
            data.forEach(comment => {
                const date = new Date(comment.fecha).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                });

                const commentElement = document.createElement('div');
                commentElement.className = 'comment-card';
                commentElement.innerHTML = `
                    <div class="comment-header">
                        <span class="comment-author">${comment.nombre}</span>
                        <span class="comment-date">${date}</span>
                    </div>
                    <div class="comment-body">${comment.comentario}</div>
                `;
                commentsList.appendChild(commentElement);
            });
        } catch (error) {
            console.error('Error loading comments:', error);
            commentsList.innerHTML = '<div class="error">Error al cargar los comentarios.</div>';
        }
    }

    // Handle comment submission
    if (commentForm) {
        commentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('comment-name');
            const textInput = document.getElementById('comment-text');
            const submitBtn = commentForm.querySelector('button');
            
            const name = nameInput.value.trim();
            const content = textInput.value.trim();

            if (!name || !content) return;

            submitBtn.disabled = true;
            submitBtn.textContent = 'Publicando...';

            try {
                const { error } = await _supabase
                    .from('comments')
                    .insert([{ nombre: name, comentario: content }]);

                if (error) throw error;

                // Clear form and reload comments
                commentForm.reset();
                await loadComments();
            } catch (error) {
                alert('Hubo un error al publicar tu comentario: ' + error.message);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Publicar Comentario';
            }
        });
    }

    // Load comments on startup
    loadComments();
});
