// js/script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header Logic ---
    const header = document.getElementById('main-header');
    const logoImg = document.getElementById('logo-img');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            if(logoImg) logoImg.style.height = '40px';
        } else {
            header.classList.remove('scrolled');
            if(logoImg) logoImg.style.height = '50px';
        }
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Reveal Animations (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // --- Form Submission Prevention (For Demo) ---
    const form = document.getElementById('enquiry-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Encrypting & Sending...';
            btn.style.backgroundColor = '#a3a3a3';
            
            // Simulate API Call
            setTimeout(() => {
                alert('Secure message transmitted successfully. A case handler will contact you via encrypted channels.');
                form.reset();
                btn.innerText = originalText;
                btn.style.backgroundColor = ''; // Reset to CSS default
            }, 2000);
        });
    }
});