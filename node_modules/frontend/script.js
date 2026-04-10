// Check if logged in on page load
let likedItemIds = JSON.parse(localStorage.getItem('likedItemIds')) || [];
let currentProductId = null;

window.onload = function() {
    const user = localStorage.getItem('user');
    if (user) {
        toggleView('home-view');
    }
    renderProductGrid(products);
    updateMyPageStats();
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
    renderProductGrid(products);
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

    // If switching to home-view, reset filter to show all
    if (viewId === 'home-view') {
        const title = document.querySelector('#home-view .section-title');
        if (title) title.textContent = "나눔 물품 리스트";
        renderProductGrid(products);
    }

    // Update stats if going to My Page
    if (viewId === 'mypage-view') {
        updateMyPageStats();
    }
}

const products = [
    {
        id: 0,
        title: "빈티지 조명",
        price: "2500",
        description: "상태 좋은 빈티지 조명입니다. 이사가게 되어 더 이상 필요하지 않아 나눔합니다. 실사용 기간은 1년 정도이며, 따뜻한 노란색 조명이 들어와서 방 분위기를 무드 있게 만들어줍니다. 인하대 정문 쪽에서 직거래 희망합니다!",
        stats: { likes: 12, views: 243, chats: 3 }
    },
    {
        id: 1,
        title: "친환경 수세미",
        price: "500",
        description: "천연 삼베로 직접 만든 친환경 수세미입니다. 세제 없이도 기름기가 잘 닦이고 미세 플라스틱 걱정이 없습니다. 새 제품 3개 세트입니다.",
        stats: { likes: 5, views: 89, chats: 1 }
    },
    {
        id: 2,
        title: "리유저블 컵",
        price: "1200",
        description: "카페에서 받은 튼튼한 리유저블 컵입니다. 깨끗하게 세척 완료했으며, 뜨거운 음료도 가능합니다. 다회용 컵 사용으로 지구를 지켜요!",
        stats: { likes: 8, views: 156, chats: 2 }
    },
    {
        id: 3,
        title: "에코백",
        price: "800",
        description: "튼튼한 캔버스 재질의 에코백입니다. A4 사이즈 노트북도 넉넉히 들어가는 크기예요. 거의 사용하지 않아 새것 같습니다.",
        stats: { likes: 15, views: 312, chats: 5 }
    },
    {
        id: 4,
        title: "유리 반찬통",
        price: "1500",
        description: "내열 유리로 제작된 반찬통입니다. 500ml 용량이며 오븐이나 전자레인지 사용이 가능합니다. 깨끗하게 소독해 두었습니다.",
        stats: { likes: 4, views: 76, chats: 0 }
    },
    {
        id: 5,
        title: "스텐 빨대",
        price: "300",
        description: "세척 솔이 포함된 스테인리스 빨대 세트입니다. 일회용 플라스틱 빨대 대신 사용해 보세요. 위생적이고 반영구적입니다.",
        stats: { likes: 20, views: 420, chats: 8 }
    },
    {
        id: 6,
        title: "대나무 칫솔",
        price: "400",
        description: "낱개 포장된 미개봉 대나무 칫솔입니다. 생분해되는 소재로 환경에 무해합니다. 여행용이나 손님용으로 추천드려요.",
        stats: { likes: 6, views: 102, chats: 2 }
    },
    {
        id: 7,
        title: "고체 샴푸바",
        price: "1000",
        description: "플라스틱 용기가 없는 고체 샴푸입니다. 약산성 소재로 두피에 자극이 없고 세정력이 좋습니다. 새 제품입니다.",
        stats: { likes: 10, views: 245, chats: 4 }
    },
    {
        id: 8,
        title: "천연 비누",
        price: "600",
        description: "핸드메이드 어성초 비누입니다. 여드름이나 민감성 피부에 좋습니다. 인공 향료가 들어가지 않은 순한 제품입니다.",
        stats: { likes: 7, views: 134, chats: 1 }
    }
];

function renderProductGrid(items, gridId = 'item-grid') {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (items.length === 0) {
        grid.innerHTML = '<p style="grid-column: span 3; padding: 40px 0; color: var(--text-muted); text-align: center;">아이템이 없습니다.</p>';
        return;
    }

    items.forEach(product => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.onclick = () => openDetail(product.id);
        
        itemCard.innerHTML = `
            <div class="item-image placeholder"></div>
            <h4 class="item-title">${product.title}</h4>
            <p class="item-price">${product.price} 크레딧</p>
        `;
        
        grid.appendChild(itemCard);
    });
}

function openDetail(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    currentProductId = id;

    // Update DOM elements in product-detail-view
    document.getElementById('detail-title').textContent = product.title;
    document.getElementById('detail-price').innerHTML = `${product.price} <span class="unit">크레딧</span>`;
    document.getElementById('detail-description-text').innerHTML = product.description.replace(/\n/g, '<br>');
    
    // Update stats
    const statsContainer = document.querySelector('.product-stats');
    if (statsContainer) {
        const extraLike = likedItemIds.includes(id) ? 1 : 0;
        statsContainer.innerHTML = `
            <span class="stat">관심 ${product.stats.likes + extraLike}</span>
            <span class="stat">조회 ${product.stats.views}</span>
            <span class="stat">채팅 ${product.stats.chats}</span>
        `;
    }

    // Update heart button status
    const heartBtn = document.getElementById('heart-btn');
    if (heartBtn) {
        if (likedItemIds.includes(id)) {
            heartBtn.textContent = '❤️';
            heartBtn.classList.add('liked');
        } else {
            heartBtn.textContent = '♡';
            heartBtn.classList.remove('liked');
        }
    }

    // Header updates
    const appHeaderH2 = document.querySelector('#product-detail-view .app-header h2');
    if (appHeaderH2) appHeaderH2.textContent = product.title;

    // Show view
    toggleView('product-detail-view');
}

function toggleLike() {
    if (currentProductId === null) return;
    
    const index = likedItemIds.indexOf(currentProductId);
    if (index > -1) {
        likedItemIds.splice(index, 1);
    } else {
        likedItemIds.push(currentProductId);
    }
    
    localStorage.setItem('likedItemIds', JSON.stringify(likedItemIds));
    
    // Refresh detail view
    openDetail(currentProductId);
    updateMyPageStats();
}

function showLikedItems() {
    const likedItems = products.filter(p => likedItemIds.includes(p.id));
    
    // Navigate to dedicated Liked Items view
    toggleView('liked-items-view');
    
    // Render into the dedicated grid
    renderProductGrid(likedItems, 'liked-item-grid');
}

function updateMyPageStats() {
    const countEl = document.getElementById('mypage-likes-count');
    if (countEl) {
        countEl.textContent = likedItemIds.length;
    }
}

// --- Mission Upload Simulation ---
let selectedMissionId = null;

function triggerMissionUpload(id) {
    selectedMissionId = id;
    document.getElementById('mission-file-input').click();
}

function handleFileSelected(event) {
    if (event.target.files.length > 0) {
        if (selectedMissionId !== null) {
            simulateMissionUpload(selectedMissionId);
        }
    }
}

function simulateMissionUpload(id) {
    const container = document.getElementById(`status-container-${id}`);
    const fill = document.getElementById(`progress-fill-${id}`);
    const text = document.getElementById(`status-text-${id}`);
    const btn = document.querySelector(`#mission-item-${id} .list-upload-btn`);
    
    if (!container || !fill || !text) return;
    
    // Reset and show
    container.style.display = 'block';
    fill.style.width = '0%';
    fill.classList.remove('waiting', 'approved');
    text.textContent = '업로드 중... 0%';
    text.className = 'mission-status-text';
    btn.disabled = true;
    btn.style.opacity = '0.5';

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Step 1: Upload Complete
            fill.style.width = '100%';
            text.textContent = '업로드 완료!';
            text.classList.add('upload-complete');
            
            setTimeout(() => {
                // Step 2: Waiting for approval (Turn bar ORANGE)
                fill.classList.add('waiting');
                text.textContent = '업로드 완료! 관리자의 승인을 기다리는 중...';
                text.classList.add('waiting');
                
                setTimeout(() => {
                    // Step 3: Approved (Reduced opacity and overlay)
                    const item = document.getElementById(`mission-item-${id}`);
                    if (item) item.classList.add('completed');
                    
                    // Turn bar to low-opacity green
                    fill.classList.remove('waiting');
                    fill.classList.add('approved');
                    
                    text.textContent = '승인 완료! +500 크레딧';
                    text.className = 'mission-status-text approved';
                    
                    btn.textContent = '완료됨';
                    btn.disabled = true;
                }, 3000); // 3 seconds for approval simulation
                
            }, 1000); // 1 second after upload complete
        } else {
            fill.style.width = `${progress}%`;
            text.textContent = `업로드 중... ${progress}%`;
        }
    }, 150);
}

// --- Navigation Enhancement ---
function jumpToMission(id) {
    // 1. Switch View
    toggleView('mission-view');
    
    // 2. Wait for DOM/Transition
    setTimeout(() => {
        const target = document.getElementById(`mission-item-${id}`);
        if (!target) return;
        
        // 3. Smooth Scroll to Target
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
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
