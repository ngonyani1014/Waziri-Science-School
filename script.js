document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. PASSWORD VISIBILITY TOGGLE
    // ==========================================
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // ==========================================
    // 2. REGISTER & RESET PASSWORD MODAL
    // ==========================================
    const openRegisterLink = document.getElementById('openRegisterLink');
    const registerModal = document.getElementById('register-modal');
    const closeRegisterBtn = document.getElementById('closeRegisterBtn');
    const resetPasswordLink = document.querySelector('.reset-link');

    if (openRegisterLink && registerModal) {
        openRegisterLink.addEventListener('click', function (e) {
            e.preventDefault();
            registerModal.style.display = 'flex';
        });
    }

    if (resetPasswordLink && registerModal) {
        resetPasswordLink.addEventListener('click', function (e) {
            e.preventDefault();
            alert("Tafadhali jisajili upya ili kuweka taarifa mpya na kupata Username na Password mpya.");
            registerModal.style.display = 'flex';
        });
    }

    if (closeRegisterBtn && registerModal) {
        closeRegisterBtn.addEventListener('click', function () {
            registerModal.style.display = 'none';
        });
    }

    window.addEventListener('click', function (e) {
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // ==========================================
    // 3. REGISTRATION SYSTEM (Saves Credentials)
    // ==========================================
    const registrationForm = document.getElementById('registration-form');
    const regSuccessMsg = document.getElementById('reg-success-msg');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Detect username and password fields flexibly from registration modal
            const regUsernameEl = document.getElementById('reg-username') || 
                                  registrationForm.querySelector('input[type="text"]') ||
                                  registrationForm.querySelector('input[name="username"]');
                                  
            const regPasswordEl = document.getElementById('reg-password') || 
                                  registrationForm.querySelector('input[type="password"]') ||
                                  registrationForm.querySelector('input[name="password"]');

            if (regUsernameEl && regPasswordEl) {
                const regUsername = regUsernameEl.value.trim();
                const regPassword = regPasswordEl.value.trim();

                if (regUsername !== "" && regPassword !== "") {
                    // Save registered user object to LocalStorage
                    const userCredentials = {
                        username: regUsername,
                        password: regPassword
                    };
                    localStorage.setItem("registeredUser", JSON.stringify(userCredentials));

                    if (regSuccessMsg) {
                        regSuccessMsg.style.color = '#28a745';
                        regSuccessMsg.style.fontWeight = 'bold';
                        regSuccessMsg.style.marginTop = '10px';
                        regSuccessMsg.textContent = "Usajili umefanikiwa! Sasa unaweza kuingia.";
                    }

                    setTimeout(function () {
                        registrationForm.reset();
                        if (regSuccessMsg) regSuccessMsg.textContent = '';
                        if (registerModal) registerModal.style.display = 'none';
                    }, 2000);
                } else {
                    alert("Tafadhali jaza sehemu zote za usajili!");
                }
            } else {
                alert("Haitambui maeneo ya kuingizia taarifa za usajili. Hakikisha id='reg-username' na id='reg-password' ziko kwenye HTML.");
            }
        });
    }

    // ==========================================
    // 4. LOGIN SYSTEM (Validates Credentials)
    // ==========================================
    const mainLoginForm = document.getElementById('main-login-form');
    const authScreen = document.getElementById('auth-screen');
    const mainApp = document.getElementById('main-app');
    const errorMsg = document.getElementById('error-msg');
    const usernameInputEl = document.getElementById('username');
    const passwordInputEl = document.getElementById('password');

    // Auto-fill saved username if 'Remember Me' was active
    const savedUsername = localStorage.getItem("savedUsername");
    if (savedUsername && usernameInputEl) {
        usernameInputEl.value = savedUsername;
        const rememberCheckbox = document.getElementById('rememberMe');
        if (rememberCheckbox) rememberCheckbox.checked = true;
    }

    if (mainLoginForm) {
        mainLoginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const enteredUsername = usernameInputEl ? usernameInputEl.value.trim() : "";
            const enteredPassword = passwordInputEl ? passwordInputEl.value.trim() : "";

            if (errorMsg) {
                errorMsg.textContent = "";
                errorMsg.style.display = "none";
            }

            // Retrieve registered credentials from localStorage
            let storedUser = null;
            const storedData = localStorage.getItem("registeredUser");
            if (storedData) {
                try {
                    storedUser = JSON.parse(storedData);
                } catch (err) {
                    storedUser = null;
                }
            }

            // Fallback default user if no registration has taken place yet
            if (!storedUser) {
                storedUser = {
                    username: "admin",
                    password: "Password123"
                };
            }

            // Validate against stored credentials
            if (
                enteredUsername === storedUser.username &&
                enteredPassword === storedUser.password
            ) {
                // SUCCESS LOGIN
                if (authScreen) authScreen.style.display = 'none';
                if (mainApp) mainApp.style.display = 'block';

                // Save remember me preference
                const rememberMe = document.getElementById('rememberMe');
                if (rememberMe && rememberMe.checked) {
                    localStorage.setItem("savedUsername", enteredUsername);
                } else {
                    localStorage.removeItem("savedUsername");
                }
            } else {
                // FAILED LOGIN
                if (errorMsg) {
                    errorMsg.textContent = "Umeingiza Username au Password isiyo sahihi!";
                    errorMsg.style.display = "block";
                    errorMsg.style.color = "#e74c3c";
                }
                if (usernameInputEl) usernameInputEl.classList.add("input-error");
                if (passwordInputEl) passwordInputEl.classList.add("input-error");
            }
        });

        // Clear error styling when typing
        [usernameInputEl, passwordInputEl].forEach(input => {
            if (input) {
                input.addEventListener("input", function () {
                    this.classList.remove("input-error");
                    if (errorMsg) errorMsg.style.display = "none";
                });
            }
        });
    }

    // ==========================================
    // 5. LOGOUT SYSTEM
    // ==========================================
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            if (mainApp) mainApp.style.display = 'none';
            if (authScreen) authScreen.style.display = 'flex';
            if (mainLoginForm) mainLoginForm.reset();
        });
    }

    // ==========================================
    // 6. SIDEBAR MENU TOGGLE
    // ==========================================
    const dashboardBtn = document.getElementById('dashboard-btn');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');

    if (dashboardBtn && sidebar) {
        dashboardBtn.addEventListener('click', function () {
            sidebar.style.width = '280px';
        });
    }

    if (closeBtn && sidebar) {
        closeBtn.addEventListener('click', function () {
            sidebar.style.width = '0';
        });
    }

    const allSidebarLinks = document.querySelectorAll('#sidebar a');
    allSidebarLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (this.id !== 'close-btn') {
                const hrefAttr = this.getAttribute('href');
                if (hrefAttr && hrefAttr.startsWith('#')) {
                    const targetId = hrefAttr.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }
                if (sidebar) sidebar.style.width = '0';
            }
        });
    });

    // ==========================================
    // 7. LANGUAGE SWITCHER
    // ==========================================
    const translations = {
        sw: {
            auth_welcome: "Karibu",
            auth_subtitle: "Ingia kwenye Mfumo wa Waziri Science School",
            remember_me: " Nikumbuke",
            reset_pass: "Umesahau Nenosiri?",
            login_submit: "INGIA",
            not_registered: "Hujajisajili?",
            click_register: "Bofya hapa kujisajili",
            school_title: "Waziri Science School",
            logout_btn: "Toka",
            lang_label: "Lugha",
            dashboard_title: "Dashboard",
            phy_notes: "Physics Notes",
            math_notes: "Mathematics Notes",
            phy_papers: "Physics Past Papers",
            math_papers: "Mathematics Past Papers",
            phy_videos: "Physics Videos",
            math_videos: "Mathematics Videos",
            welcome_title: "Karibu sana Waziri Science School!",
            welcome_desc: "Hapa utapata Notes, Past Papers, na Video za masomo ya Physics na Mathematics kuanzia Form 1 hadi Form 6 kwa urahisi kabisa.",
            sec_phy_papers: "Mitihani ya Zamani ya Physics (PDF)",
            sec_math_papers: "Mitihani ya Zamani ya Mathematics (PDF)",
            contact_title: "Mawasiliano",
            phone_text: "Simu:",
            whatsapp_text: "WhatsApp:",
            email_text: "Barua pepe:",
            website_text: "Tovuti:",
            footer_rights: "© 2026 Waziri Science School. Haki zote zimehifadhiwa.",
            footer_author: "Imeandaliwa na Mwl. Waziri Rajabu Ngonyani"
        },
        en: {
            auth_welcome: "Welcome",
            auth_subtitle: "Log into Waziri Science School Portal",
            remember_me: " Remember me",
            reset_pass: "Reset Password?",
            login_submit: "LOGIN",
            not_registered: "Not Registered?",
            click_register: "Click here to register",
            school_title: "Waziri Science School",
            logout_btn: "Logout",
            lang_label: "Language",
            dashboard_title: "Dashboard",
            phy_notes: "Physics Notes",
            math_notes: "Mathematics Notes",
            phy_papers: "Physics Past Papers",
            math_papers: "Mathematics Past Papers",
            phy_videos: "Physics Videos",
            math_videos: "Mathematics Videos",
            welcome_title: "Welcome to Waziri Science School!",
            welcome_desc: "Here you can easily access Notes, Past Papers, and Videos for Physics and Mathematics from Form 1 to Form 6.",
            sec_phy_papers: "Physics Past Papers (PDF)",
            sec_math_papers: "Mathematics Past Papers (PDF)",
            contact_title: "Contact Us",
            phone_text: "Phone:",
            whatsapp_text: "WhatsApp:",
            email_text: "Email:",
            website_text: "Website:",
            footer_rights: "© 2026 Waziri Science School. All rights reserved.",
            footer_author: "Prepared by Tchr. Waziri Rajabu Ngonyani"
        }
    };

    function changeLanguage(lang) {
        const elements = document.querySelectorAll('[data-key]');
        elements.forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
    }

    const langSwBtn = document.getElementById('lang-sw');
    const langEnBtn = document.getElementById('lang-en');

    if (langSwBtn) {
        langSwBtn.addEventListener('click', function (e) {
            e.preventDefault();
            changeLanguage('sw');
        });
    }

    if (langEnBtn) {
        langEnBtn.addEventListener('click', function (e) {
            e.preventDefault();
            changeLanguage('en');
        });
    }

    // ==========================================
    // 8. SECURITY (Right-click & Shortcut Restriction)
    // ==========================================
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
    });

    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
            alert("Kitendo hiki kimezuiwa kwenye mfumo huu.");
        }
    });

    // ==========================================
    // 9. SECTION DISPLAY & DISMISSAL
    // ==========================================
    document.addEventListener('click', function (event) {
        const clickedBtn = event.target.closest("button");
        const sections = [
            'form1-physics-section', 'form2-physics-section', 'form3-physics-section',
            'form4-physics-section', 'form5-physics-section', 'form6-physics-section',
            'form1-math-section', 'form2-math-section', 'form3-math-section',
            'form4-math-section', 'form5-math-section', 'form6-math-section'
        ];

        sections.forEach(secId => {
            const secElement = document.getElementById(secId);
            if (secElement && secElement.style.display === "block") {
                if (!secElement.contains(event.target) && (!clickedBtn || !clickedBtn.getAttribute('onclick')?.includes(secId))) {
                    secElement.style.display = "none";
                }
            }
        });
    });
});

// GLOBAL TOGGLE FUNCTION FOR SUBJECT SECTIONS
function toggleSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        if (targetSection.style.display === "block") {
            targetSection.style.display = "none";
        } else {
            targetSection.style.display = "block";
        }
    }
}
