// Check if logged in on page load
window.onload = function() {
    const user = localStorage.getItem('user');
    if (user) {
        toggleView('home-view');
        // Wait, maybe we should update the UI with their name later
    }
};

function handleLogin() {
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        alert('이메일과 비밀번호를 모두 입력해주세요.');
        return;
    }

    // Mock Login - Always succeed for wireframes
    alert('로그인에 성공했습니다!');
    
    // Save a mock user session
    localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: '김나현',
        email: email
    }));
    
    // Clear inputs
    emailInput.value = '';
    passwordInput.value = '';
    
    // Go to home view
    toggleView('home-view');
}

function handleSignup() {
    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const confirmInput = document.getElementById('signup-password-confirm');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirm = confirmInput.value.trim();

    if (!name || !email || !password || !confirm) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    if (password !== confirm) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    // Mock Signup - Always succeed
    alert('회원가입이 완료되었습니다. 이제 로그인해주세요.');
    
    // Clear inputs
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmInput.value = '';
    
    // Go to login view
    toggleView('login-view');
}

// 로그아웃 (선택 기능)
function logout() {
    localStorage.removeItem('user');
    toggleView('login-view');
}

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
