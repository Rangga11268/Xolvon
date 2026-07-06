// ============================================
// Xolvon Project Incubator — Scripts
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // === Mobile Menu ===
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // === Navbar Shadow on Scroll ===
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            var scrolled = window.scrollY > 20;
            nav.classList.toggle('nav-shadow', scrolled);
        });
    }

    // === Smooth Scroll ===
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // === Scroll Animations (Intersection Observer) ===
    var animObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var type = el.dataset.anim || 'fade';

                if (type === 'left') {
                    el.classList.remove('anim-hidden-left');
                    el.classList.add('anim-visible-left');
                } else if (type === 'right') {
                    el.classList.remove('anim-hidden-right');
                    el.classList.add('anim-visible-right');
                } else if (type === 'scale') {
                    el.classList.remove('anim-hidden-scale');
                    el.classList.add('anim-visible-scale');
                } else {
                    el.classList.remove('anim-hidden');
                    el.classList.add('anim-visible');
                }

                animObserver.unobserve(el);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-anim]').forEach(function (el) {
        var type = el.dataset.anim;
        if (type === 'left') el.classList.add('anim-hidden-left');
        else if (type === 'right') el.classList.add('anim-hidden-right');
        else if (type === 'scale') el.classList.add('anim-hidden-scale');
        else el.classList.add('anim-hidden');
        animObserver.observe(el);
    });

    // === Active Nav Link Highlight ===
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        var scrollPos = window.scrollY + 150;
        var current = '';

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    if (sections.length && navLinks.length) {
        window.addEventListener('scroll', updateActiveNav);
        window.addEventListener('load', updateActiveNav);
        updateActiveNav();
    }

    // === Countdown Timer (fixed deadline — ganti tanggal di sini) ===
    var countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        var endTime = new Date(Date.now() + (48 * 60 * 60 * 1000) - (5 * 60 * 1000));

        function updateCountdown() {
            var now = new Date();
            var diff = endTime - now;

            if (diff <= 0) {
                document.getElementById('countdown-days').textContent = '00';
                document.getElementById('countdown-hours').textContent = '00';
                document.getElementById('countdown-minutes').textContent = '00';
                document.getElementById('countdown-seconds').textContent = '00';
                return;
            }

            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('countdown-days').textContent = String(days).padStart(2, '0');
            document.getElementById('countdown-hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('countdown-minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('countdown-seconds').textContent = String(seconds).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // === Form Validation ===
    var form = document.getElementById('submit-form');
    if (form) {
        var inputs = form.querySelectorAll('input[required]');

        inputs.forEach(function (input) {
            input.addEventListener('blur', function () {
                validateInput(input);
            });
            input.addEventListener('input', function () {
                if (input.classList.contains('error') || input.classList.contains('success')) {
                    validateInput(input);
                }
            });
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var valid = true;

            inputs.forEach(function (input) {
                if (!validateInput(input)) {
                    valid = false;
                }
            });

            if (valid) {
                var btn = form.querySelector('button[type="submit"]');
                var originalText = btn.innerHTML;
                btn.innerHTML = '<i data-lucide="loader-circle" class="w-4 h-4 animate-spin"></i> Mengirim...';
                btn.disabled = true;

                setTimeout(function () {
                    btn.innerHTML = '<i data-lucide="check-circle" class="w-4 h-4"></i> Tugas Terkirim!';
                    btn.className = btn.className.replace('bg-brand-600', 'bg-green-600');
                    btn.className = btn.className.replace('hover:bg-brand-700', '');
                    btn.disabled = false;
                    lucide.createIcons();

                    setTimeout(function () {
                        form.reset();
                        btn.innerHTML = originalText;
                        btn.className = btn.className.replace('bg-green-600', 'bg-brand-600') + ' hover:bg-brand-700';
                        inputs.forEach(function (i) {
                            i.classList.remove('success', 'error');
                        });
                        lucide.createIcons();
                    }, 3000);
                }, 1500);
            }
        });

        function validateInput(input) {
            var errorMsg = input.parentElement.querySelector('.form-error-msg');
            var value = input.value.trim();
            var isValid = true;

            if (input.type === 'email') {
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            } else if (input.type === 'url') {
                isValid = /^https?:\/\/.+\..+/.test(value);
            } else {
                isValid = value.length > 0;
            }

            if (isValid) {
                input.classList.remove('error');
                input.classList.add('success');
                if (errorMsg) errorMsg.classList.remove('visible');
            } else {
                input.classList.remove('success');
                input.classList.add('error');
                if (errorMsg) errorMsg.classList.add('visible');
            }

            return isValid;
        }
    }

    // === Back to Top Button ===
    var backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === Lucide Icons Init ===
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

});
