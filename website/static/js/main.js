// ============================================
// SCHIZOID LLOYD - WEBSITE JAVASCRIPT
// ============================================

// Mobile nav toggle
function toggleNav() {
    const nav = document.getElementById('navLinks');
    nav.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function updateNavHeight() {
    const nav = document.querySelector('.main-nav');
    const navHeight = nav.offsetHeight;
    document.documentElement.style.setProperty('--nav-height', navHeight + 'px');
}

window.addEventListener('load', updateNavHeight);
window.addEventListener('resize', updateNavHeight);

// Close mobile nav when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const nav = document.getElementById('navLinks');
        nav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Smooth scrolling with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = document.querySelector('.main-nav').offsetHeight;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Copy Nano address to clipboard
function copyNanoAddress() {
    const address = document.getElementById('nanoAddress').textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(showCopyNotification);
    } else {
        fallbackCopy(address);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showCopyNotification();
}

function showCopyNotification() {
    const btn = document.querySelector('.btn-copy');
    const originalText = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.style.background = '#0f0';
    btn.style.color = '#000';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
    }, 2000);
}

// Nano QR Placeholder
function generateNanoQR() {
    const qr = document.getElementById('nanoQR');
    const addr = document.getElementById('nanoAddress').textContent;
    qr.innerHTML = `<div style="padding:20px;text-align:center;font-size:12px">Scan for Nano<br><small>${addr.slice(0,14)}...</small></div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    generateNanoQR();

    // Fade-in sections
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});

// Active nav highlight on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active-link'));
            link.classList.add('active-link');
        }
    });
});