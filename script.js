// Script.js - Interactive functionality for IqraSoft

document.addEventListener('DOMContentLoaded', () => {
    console.log('ISoft Website Loaded');

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

document.addEventListener('DOMContentLoaded', () => {
    const aiFab = document.getElementById('ai-fab');
    const aiWidget = document.getElementById('ai-chat-widget');
    const aiCloseBtn = document.getElementById('ai-close-btn');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiSendBtn = document.getElementById('ai-send-btn');
    const aiChatMessages = document.getElementById('ai-chat-messages');

    let isChatOpen = false;
    let messageHistory = [];

    const toggleChat = () => {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            aiWidget.classList.remove('closed');
            setTimeout(() => aiChatInput.focus(), 300);
        } else {
            aiWidget.classList.add('closed');
        }
    };

    if (aiFab) aiFab.addEventListener('click', toggleChat);
    if (aiCloseBtn) aiCloseBtn.addEventListener('click', toggleChat);

    if (aiChatInput) {
        aiChatInput.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            aiSendBtn.disabled = this.value.trim() === '';
        });

        aiChatInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    if (aiSendBtn) aiSendBtn.addEventListener('click', sendMessage);

    const addMessageToUI = (text, sender) => {
        if (!aiChatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

        let formattedText = text.replace(/\n/g, '<br>');
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        msgDiv.innerHTML = `<p>${formattedText}</p>`;
        aiChatMessages.appendChild(msgDiv);
        scrollToBottom();
    };

    const showTypingIndicator = () => {
        if (!aiChatMessages) return;
        const indicatorDiv = document.createElement('div');
        indicatorDiv.id = 'ai-typing-indicator';
        indicatorDiv.classList.add('typing-indicator');
        indicatorDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        aiChatMessages.appendChild(indicatorDiv);
        scrollToBottom();
    };

    const removeTypingIndicator = () => {
        const indicator = document.getElementById('ai-typing-indicator');
        if (indicator) indicator.remove();
    };

    const scrollToBottom = () => {
        if (aiChatMessages) aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    };

    async function sendMessage() {
        if (!aiChatInput) return;
        const text = aiChatInput.value.trim();
        if (!text) return;

        addMessageToUI(text, 'user');
        messageHistory.push({ role: 'user', content: text });

        aiChatInput.value = '';
        aiChatInput.style.height = 'auto';
        if (aiSendBtn) aiSendBtn.disabled = true;

        showTypingIndicator();

        try {
            const isLocal = window.location.hostname === 'localhost' || window.location.protocol === 'file:';
            const apiUrl = isLocal ? 'http://localhost:8000/api/chat' : '/api/chat';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: messageHistory })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            removeTypingIndicator();

            if (data.error) {
                addMessageToUI("I'm sorry, I'm having trouble connecting right now.", 'bot');
            } else if (data.reply) {
                addMessageToUI(data.reply, 'bot');
                messageHistory.push({ role: 'assistant', content: data.reply });
            }

        } catch (error) {
            removeTypingIndicator();
            addMessageToUI("Oops! Something went wrong communicating with the server.", 'bot');
        }
    }
});
