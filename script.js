// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;
        
        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});

// Scroll-based Parallax for mobile/devices without mouse
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Animated Counter for Stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
};

// Intersection Observer for Stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Reveal on Scroll Animation
const revealElements = document.querySelectorAll('.service-card, .doctor-card, .about-content, .about-image');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    revealObserver.observe(el);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Form Interaction
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Create success message with neumorphism
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        
        btn.textContent = '✓ Appointment Requested!';
        btn.style.background = 'linear-gradient(135deg, #48bb78, #38a169)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

// Service Card Interaction
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// 3D Tilt Effect for Cards (Enhanced Neumorphism)
document.querySelectorAll('.neu-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile Menu Toggle (for future mobile optimization)
const createMobileMenu = () => {
    const nav = document.querySelector('.navbar');
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn neu-btn-small';
    menuBtn.innerHTML = '☰';
    menuBtn.style.display = 'none';
    
    nav.appendChild(menuBtn);
    
    // Show/hide based on screen size
    const checkWidth = () => {
        if (window.innerWidth <= 768) {
            menuBtn.style.display = 'block';
        } else {
            menuBtn.style.display = 'none';
        }
    };
    
    window.addEventListener('resize', checkWidth);
    checkWidth();
};

createMobileMenu();
