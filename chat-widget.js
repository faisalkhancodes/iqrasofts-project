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
            const response = await fetch('/api/chat', {
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
