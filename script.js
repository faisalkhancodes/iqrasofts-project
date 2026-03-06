// Script.js - Interactive functionality for IqraSoft

document.addEventListener('DOMContentLoaded', () => {
    console.log('IqraSoft Website Loaded');

    // Mobile Menu Toggle logic will go here
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = 150;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', reveal);
    window.addEventListener('load', reveal);

    // Blog Filtering Logic
    const blogSearch = document.getElementById('blogSearch');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const blogPosts = document.querySelectorAll('.blog-post');
    const blogTags = document.querySelectorAll('.tag');

    const filterPosts = () => {
        const searchTerm = blogSearch?.value.toLowerCase() || '';
        const activeCategory = document.querySelector('.category-list a.active')?.textContent.toLowerCase() || 'all posts';

        blogPosts.forEach(post => {
            const title = post.querySelector('h2').textContent.toLowerCase();
            const category = post.getAttribute('data-category')?.toLowerCase() || '';
            const tags = post.getAttribute('data-tags')?.toLowerCase() || '';

            const matchesSearch = title.includes(searchTerm) || tags.includes(searchTerm);
            const matchesCategory = activeCategory === 'all posts' || category === activeCategory;

            if (matchesSearch && matchesCategory) {
                post.style.display = 'block';
                // Trigger reveal for newly shown items
                post.classList.add('active');
            } else {
                post.style.display = 'none';
            }
        });
    }

    if (blogSearch) {
        blogSearch.addEventListener('input', filterPosts);
    }

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            filterPosts();
        });
    });

    blogTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            if (blogSearch) {
                blogSearch.value = tag.textContent;
                filterPosts();
            }
        });
    });

    // Global Form Handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            button.disabled = true;
            button.textContent = 'Sending...';

            setTimeout(() => {
                alert('Thank you! Your message has been sent successfully.');
                button.disabled = false;
                button.textContent = originalText;
                form.reset();
            }, 1000);
        });
    });
});
