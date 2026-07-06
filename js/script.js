// ============================================
// Xolvon Project Incubator — Scripts
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // --- Initialize Lucide Icons ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        const menuIcon = menuBtn.querySelector('i');
        
        menuBtn.addEventListener('click', function () {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon if lucide is active
            if (menuIcon && typeof lucide !== 'undefined') {
                if (isHidden) {
                    menuIcon.setAttribute('data-lucide', 'x');
                } else {
                    menuIcon.setAttribute('data-lucide', 'menu');
                }
                lucide.createIcons();
            }
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
                if (menuIcon && typeof lucide !== 'undefined') {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // --- Navbar Scroll Effect ---
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 20) {
                nav.classList.add('bg-slate-950/90', 'border-slate-800/80', 'py-1', 'shadow-2xl');
                nav.classList.remove('bg-transparent', 'border-transparent');
            } else {
                nav.classList.remove('bg-slate-950/90', 'border-slate-800/80', 'py-1', 'shadow-2xl');
            }
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                
                // Calculate offset for fixed header
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});
