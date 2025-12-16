document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to Top Button
        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Back to Top functionality
    document.getElementById('back-to-top').addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Typing Effect
    const typingText = document.getElementById('typing-text');
    const words = ['DevOps Engineer', 'SRE', 'Product Engineer', 'Python Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);

    // Number Counting Animation
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateStats() {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-count');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS

            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                if (current >= target) {
                    stat.textContent = target; // Ensure exact final value used if suffix needed like '+'
                    if (target === 3) stat.textContent = "3+";
                    if (target === 500) stat.textContent = "500+";
                    if (target === 100) stat.textContent = "100+";
                    clearInterval(timer);
                }
            }, 16);
        });
    }

    // Scroll Reveal Animation System
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Number Counter Trigger
                if (entry.target.classList.contains('about-stats') && !hasAnimated) {
                    animateStats();
                    hasAnimated = true;
                }

                // Global Reveal Trigger
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Initial Setup for Reveal Elements
    const revealElements = document.querySelectorAll(
        '.section-title, .about-text, .skill-category, .project-card, .contact-content, .about-stats'
    );

    revealElements.forEach((el, index) => {
        el.classList.add('reveal');
        // Add staggering for grids
        if (el.classList.contains('skill-category') || el.classList.contains('project-card')) {
            // Create a simple modulo staggered delay
            el.style.transitionDelay = `${(index % 3) * 0.1}s`;
        }
        observer.observe(el);
    });

    // Form Submission (Prevent Default)
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';

        // Simulate sending
        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = '#e17055'; // Success color (Orange)
            form.reset();

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = ''; // Reset to gradient
            }, 3000);
        }, 2000);
    });

    // Three.js Background Animation (Main)
    function initThreeJsBackground() {
        const container = document.getElementById('canvas-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Particles
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 30; // Wider spread
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const material = new THREE.PointsMaterial({
            size: 0.03,
            color: 0xe17055, // Primary Orange
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particlesMesh = new THREE.Points(particlesGeometry, material);
        scene.add(particlesMesh);

        // Background Geometries
        const geometry = new THREE.IcosahedronGeometry(10, 1);
        const materialWire = new THREE.MeshBasicMaterial({
            color: 0xfdcb6e, // Accent Gold/Yellow
            wireframe: true,
            transparent: true,
            opacity: 0.05
        });
        const sphere = new THREE.Mesh(geometry, materialWire);
        scene.add(sphere);

        // Scroll & Mouse Interaction
        camera.position.z = 5;
        let mouseX = 0;
        let mouseY = 0;
        let scrollY = 0;

        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        });

        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Rotations
            particlesMesh.rotation.y = elapsedTime * 0.05;
            sphere.rotation.y = elapsedTime * 0.05;
            sphere.rotation.x = elapsedTime * 0.05;

            // Mouse Parallax
            particlesMesh.position.x += (mouseX * 0.0001 - particlesMesh.position.x) * 0.05;
            particlesMesh.position.y += (-mouseY * 0.0001 - particlesMesh.position.y) * 0.05;

            // Scroll Fly-through logic
            // Move camera z-position based on scroll
            camera.position.z = 5 + (scrollY * 0.005);
            // Slight rotation
            camera.rotation.z = -scrollY * 0.0001;

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // 3D Object for About Section (Tech Core)
    function initAbout3D() {
        const container = document.getElementById('about-3d-scene');
        if (!container) return;

        // Container dimensions might be small initially, so check
        let width = container.clientWidth || 300;
        let height = container.clientHeight || 300;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        // Tech Knot (Torus Knot)
        const geometry = new THREE.TorusKnotGeometry(10, 2.5, 100, 16);
        const material = new THREE.MeshBasicMaterial({
            color: 0xe17055, // Primary Orange
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });

        const knot = new THREE.Mesh(geometry, material);
        scene.add(knot);

        // Inner Core
        const coreGeo = new THREE.SphereGeometry(4, 32, 32);
        const coreMat = new THREE.MeshBasicMaterial({
            color: 0xfdcb6e, // Gold Core
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        camera.position.z = 40;

        const clock = new THREE.Clock();

        function animateAbout() {
            requestAnimationFrame(animateAbout);
            const time = clock.getElapsedTime();

            knot.rotation.x = time * 0.2;
            knot.rotation.y = time * 0.5;

            core.rotation.x = -time * 0.5;
            core.rotation.y = time * 0.2;

            // Pulse
            const scale = 1 + Math.sin(time * 2) * 0.05;
            knot.scale.set(scale, scale, scale);

            renderer.render(scene, camera);
        }

        animateAbout();

        window.addEventListener('resize', () => {
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            if (newWidth && newHeight) {
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            }
        });
    }

    // Initialize both scenes safely
    try {
        if (typeof THREE !== 'undefined') {
            initThreeJsBackground();
            setTimeout(initAbout3D, 100);
        } else {
            console.warn('Three.js not loaded');
        }
    } catch (e) {
        console.error('Three.js initialization failed:', e);
    }

    // Parallax Effects
    initScrollParallax();
    initTiltEffect();
});

// Scroll Parallax System
// Scroll Parallax System
function initScrollParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');

    if (parallaxElements.length === 0) return;

    // Cache initial positions to avoid layout thrashing and calculation errors
    const elements = Array.from(parallaxElements).map(el => {
        // Ensure hardware acceleration
        el.style.willChange = 'transform';
        // Remove any CSS transitions that might conflict with scroll updates
        el.style.transition = 'none';

        return {
            el,
            speed: parseFloat(el.getAttribute('data-speed') || 0.1),
            // Robust absolute position calculation
            initialTop: el.getBoundingClientRect().top + window.scrollY
        };
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        elements.forEach(item => {
            const { el, speed, initialTop } = item;

            // Calculate relative movement
            const yPos = (scrolled - initialTop) * speed;
            el.style.transform = `translateY(${yPos}px)`;
        });
    }, { passive: true });
}

// 3D Tilt Effect for Cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .skill-category, .terminal-window, .image-frame');

    cards.forEach(card => {
        // Set transition property for smooth entry/exit
        card.style.transition = 'transform 0.1s ease-out';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}
