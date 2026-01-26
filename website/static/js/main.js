// ============================================
// SCHIZOID LLOYD - WEBSITE JAVASCRIPT
// ============================================

// Smooth scrolling with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
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
    
    // Modern clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(address).then(() => {
            showCopyNotification();
        }).catch(err => {
            console.error('Failed to copy: ', err);
            fallbackCopy(address);
        });
    } else {
        fallbackCopy(address);
    }
}

// Fallback copy method for older browsers
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopyNotification();
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy notification
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

// Generate Nano QR Code placeholder
function generateNanoQR() {
    const qrContainer = document.getElementById('nanoQR');
    const address = document.getElementById('nanoAddress').textContent;
    
    // Create a simple visual representation
    qrContainer.innerHTML = `
        <div style="padding: 20px; text-align: center;">
            <div style="font-size: 12px; color: #333; margin-bottom: 10px;">NANO ADDRESS QR</div>
            <div style="font-size: 10px; color: #666; word-break: break-all; max-width: 160px; margin: 0 auto;">
                Scan with your Nano wallet
            </div>
            <div style="margin-top: 10px; font-size: 8px; color: #999;">
                ${address.substring(0, 15)}...
            </div>
        </div>
    `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    generateNanoQR();
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Fade in sections on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.style.color = '';
            });
            navLink.style.color = 'var(--color-accent)';
        }
    });
});
