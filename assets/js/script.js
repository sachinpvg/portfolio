// 1. Loading Screen & Init
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');

    // Ensure scroll is at top on load
    window.scrollTo(0, 0);

    // Simulate loading time for visual effect (fonts, particles, etc.)
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.remove('overflow-hidden');
            initAnimations();
        }, 500);
    }, 1800);
});

// Custom cursor logic removed.

// 3. Initialize Particles.js
particlesJS('particles-js', {
    "particles": {
        "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00f0ff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.3, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#00f0ff", "opacity": 0.2, "width": 1 },
        "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 180, "line_linked": { "opacity": 0.4 } },
            "push": { "particles_nb": 3 }
        }
    },
    "retina_detect": true
});

// 4. Initialization Logic
function initAnimations() {
    // Typed.js dynamically formats text
    new Typed('#typed-text', {
        strings: ['MERN Stack Developer', 'Frontend Specialist', 'Backend Enthusiast'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        cursorChar: '_'
    });

    // AOS Initialization
    AOS.init({
        duration: 1000,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
    });

    // GSAP scroll trigger for stat counters
    gsap.registerPlugin(ScrollTrigger);

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        ScrollTrigger.create({
            trigger: counter,
            start: "top 85%",
            onEnter: () => {
                const target = +counter.getAttribute('data-target');
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2.5,
                    snap: { innerHTML: 1 },
                    ease: "power2.out"
                });
            },
            once: true
        });
    });

    // Navbar blur effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(6, 9, 19, 0.85)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.8)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(6, 9, 19, 0.6)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 0';
        }
    });
}

// 5. Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = document.getElementById('submitBtn');
        const btnText = btn.querySelector('.btn-text');
        const msgDiv = document.getElementById('formMessage');

        const formData = new FormData(this);

        btn.disabled = true;
        btnText.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin ms-2"></i>';

        fetch('contact.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                msgDiv.classList.remove('d-none', 'alert-danger', 'alert-success');
                if (data.success) {
                    msgDiv.classList.add('alert-success');
                    msgDiv.innerHTML = '<i class="fa-solid fa-check-circle me-2"></i>' + data.message;
                    contactForm.reset();
                } else {
                    msgDiv.classList.add('alert-danger');
                    msgDiv.innerHTML = '<i class="fa-solid fa-triangle-exclamation me-2"></i>' + data.message;
                }
            })
            .catch(error => {
                msgDiv.classList.remove('d-none', 'alert-success');
                msgDiv.classList.add('alert-danger');
                msgDiv.innerHTML = '<i class="fa-solid fa-triangle-exclamation me-2"></i>An error occurred. Please try again.';
            })
            .finally(() => {
                btn.disabled = false;
                btnText.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane ms-2"></i>';
                setTimeout(() => {
                    msgDiv.classList.add('d-none');
                }, 5000);
            });
    });
}
