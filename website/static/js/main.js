// ============================================
// SCHIZOID LLOYD - WEBSITE JAVASCRIPT
// ============================================

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function() {
    
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open on mobile
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scrolling with offset for fixed nav
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = 70; // Fixed nav height
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Copy Nano address to clipboard
    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            const address = document.getElementById('nanoAddress').textContent;
            const btn = this;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(address).then(function() {
                    showCopySuccess(btn);
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = address;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopySuccess(btn);
            }
        });
    }

    // Generate Nano QR
    generateNanoQR();

    // Fade-in sections on scroll
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(function(section) {
        observer.observe(section);
    });
});

function showCopySuccess(btn) {
    const originalText = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.style.background = '#0f0';
    btn.style.color = '#000';

    setTimeout(function() {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
    }, 2000);
}

// Nano QR Placeholder
function generateNanoQR() {
    const qr = document.getElementById('nanoQR');
    const addr = document.getElementById('nanoAddress');
    if (qr && addr) {
        qr.innerHTML = '<div style="padding:20px;text-align:center;font-size:12px">Scan for Nano<br><small>' + addr.textContent.slice(0,14) + '...</small></div>';
    }
}

// Active nav highlight on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector('.nav-links a[href="#' + id + '"]');

        if (link && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(function(a) {
                a.classList.remove('active-link');
            });
            link.classList.add('active-link');
        }
    });
});