function toggleView(viewId) {
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show the targeted view
    document.getElementById(viewId).classList.add('active');
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        const container = document.getElementById('chat-messages-container');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message sent';
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        bubbleDiv.textContent = message;
        
        messageDiv.appendChild(bubbleDiv);
        container.appendChild(messageDiv);
        
        input.value = '';
        container.scrollTop = container.scrollHeight;
    }
}
