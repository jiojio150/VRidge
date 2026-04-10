const missions = [
    { id: 0, title: "텀블러 인증 사진", reward: 500, description: "텀블러 사용 사진을 인증하고 크레딧을 받으세요." },
    { id: 1, title: "대중교통 인증 사진", reward: 500, description: "대중교통 사진을 인증하고 크레딧을 받으세요." },
    { id: 2, title: "음식 남기지 않기 인증 사진", reward: 500, description: "음식 남기지 않은 사진을 인증하고 크레딧을 받으세요." },
    { id: 3, title: "물품 나눔하기", reward: 500, description: "사용하지 않는 물품을 나눔하고 크레딧을 받으세요.", isSpecial: true }
];

let likedItemIds = JSON.parse(localStorage.getItem('likedItemIds')) || [];
let currentProductId = null;
let completedMissionIds = JSON.parse(localStorage.getItem('completedMissionIds')) || [];
let attendanceDates = JSON.parse(localStorage.getItem('attendanceDates')) || [];

const deptGrowthData = {
    labels: ["12월", "1월", "2월", "3월", "4월"],
    datasets: [
        { name: "컴퓨터공학과", points: [80, 85, 95, 105, 112], color: "#10B981" },
        { name: "디자인테크놀로지학과", points: [60, 70, 75, 90, 108], color: "#3B82F6" },
        { name: "경영학과", points: [50, 55, 60, 85, 98], color: "#F59E0B" }
    ]
};

const creditHistory = [
    { id: 0, date: "2026.04.10", title: "텀블러 인증 미션 완료", amount: 500, type: "earn" },
    { id: 1, date: "2026.04.09", title: "빈티지 조명 나눔 완료", amount: 2500, type: "earn" },
    { id: 2, date: "2026.04.08", title: "리유저블 컵 입찰", amount: -1200, type: "spend" },
    { id: 3, date: "2026.04.08", title: "에코백 나눔 완료", amount: 800, type: "earn" }
];

window.onload = function() {
    const user = localStorage.getItem('user');
    if (user) {
        toggleView('home-view');
    }
    renderProductGrid(products);
    renderHomeMissions();
    renderMissionList();
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

    alert('로그인에 성공했습니다!');
    
    localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: '김나현',
        email: email
    }));
    
    emailInput.value = '';
    passwordInput.value = '';
    
    toggleView('home-view');
    renderProductGrid(products);
    renderHomeMissions();
    renderMissionList();
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

    alert('회원가입이 완료되었습니다. 이제 로그인해주세요.');
    
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmInput.value = '';
    
    toggleView('login-view');
}

function logout() {
    localStorage.removeItem('user');
    toggleView('login-view');
}

function toggleView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    document.getElementById(viewId).classList.add('active');

    if (viewId === 'home-view') {
        const title = document.querySelector('#home-view .section-title');
        if (title) title.textContent = "나눔 물품 리스트";
        renderProductGrid(products);
        renderHomeMissions();
    }

    if (viewId === 'mission-view') {
        renderMissionList();
    }

    if (viewId === 'mypage-view') {
        updateMyPageStats();
    }
}

const products = [
    {
        id: 0,
        title: "빈티지 조명",
        price: "2500",
        isUserOwned: true,
        recipientName: "이지오",
        description: "상태 좋은 빈티지 조명입니다. 이사가게 되어 더 이상 필요하지 않아 나눔합니다. 실사용 기간은 1년 정도이며, 따뜻한 노란색 조명이 들어와서 방 분위기를 무드 있게 만들어줍니다. 인하대 정문 쪽에서 직거래 희망합니다!",
        stats: { likes: 12, views: 243, chats: 3 }
    },
    {
        id: 1,
        title: "친환경 수세미",
        price: "500",
        isUserOwned: true,
        recipientName: "김애리",
        description: "천연 삼베로 직접 만든 친환경 수세미입니다. 세제 없이도 기름기가 잘 닦이고 미세 플라스틱 걱정이 없습니다. 새 제품 3개 세트입니다.",
        stats: { likes: 5, views: 89, chats: 1 }
    },
    {
        id: 2,
        title: "리유저블 컵",
        price: "1200",
        isUserOwned: true,
        recipientName: "박준혁",
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
            ${gridId === 'shared-item-grid' && product.recipientName 
                ? `<p class="item-recipient" style="font-size: 11px; color: var(--primary-green); margin-top: 4px;">나눔 완료: ${product.recipientName}님</p>`
                : `<p class="item-price">${product.price} 크레딧</p>`}
        `;
        grid.appendChild(itemCard);
    });
}

function openDetail(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    currentProductId = id;
    document.getElementById('detail-title').textContent = product.title;
    document.getElementById('detail-price').innerHTML = `${product.price} <span class="unit">크레딧</span>`;
    document.getElementById('detail-description-text').innerHTML = product.description.replace(/\n/g, '<br>');
    const statsContainer = document.querySelector('.product-stats');
    if (statsContainer) {
        const extraLike = likedItemIds.includes(id) ? 1 : 0;
        statsContainer.innerHTML = `
            <span class="stat">관심 ${product.stats.likes + extraLike}</span>
            <span class="stat">조회 ${product.stats.views}</span>
            <span class="stat">채팅 ${product.stats.chats}</span>
        `;
    }
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
    const appHeaderH2 = document.querySelector('#product-detail-view .app-header h2');
    if (appHeaderH2) appHeaderH2.textContent = product.title;
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
    openDetail(currentProductId);
    updateMyPageStats();
}

function showLikedItems() {
    const likedItems = products.filter(p => likedItemIds.includes(p.id));
    toggleView('liked-items-view');
    renderProductGrid(likedItems, 'liked-item-grid');
}

function showSharedItems() {
    const sharedItems = products.filter(p => p.isUserOwned);
    toggleView('shared-items-view');
    renderProductGrid(sharedItems, 'shared-item-grid');
}

function showCreditHistory() {
    toggleView('credit-history-view');
    renderCreditCalendar();
    const container = document.getElementById('credit-history-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    creditHistory.sort((a,b) => new Date(b.date) - new Date(a.date)).forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        const sign = item.amount > 0 ? '+' : '';
        const amountDisplay = `${sign}${item.amount.toLocaleString()}`;
        
        historyItem.innerHTML = `
            <div class="history-info-box">
                <span class="history-date">${item.date}</span>
                <span class="history-title">${item.title}</span>
            </div>
            <div class="history-amount ${item.type}">${amountDisplay}</div>
        `;
        container.appendChild(historyItem);
    });
}

function checkAttendance() {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '.');
    if (attendanceDates.includes(today)) {
        alert('오늘은 이미 출석 도장을 찍으셨습니다! 내일 또 오세요.');
        return;
    }

    const reward = Math.floor(Math.random() * 3) + 1;
    attendanceDates.push(today);
    localStorage.setItem('attendanceDates', JSON.stringify(attendanceDates));

    creditHistory.push({
        id: Date.now(),
        date: today,
        title: "일일 출석 보상",
        amount: reward,
        type: "earn"
    });
    
    // Update UI
    const stampBtn = document.getElementById('stamp-btn');
    if (stampBtn) {
        stampBtn.classList.add('checked');
        stampBtn.textContent = '완료';
    }
    
    alert(`출석 완료! ${reward} 크레딧이 적립되었습니다.`);
    renderHomeMissions(); // Refresh anything if needed
}

function renderCreditCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    calendarGrid.innerHTML = '';
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    // Day labels
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    days.forEach(day => {
        const span = document.createElement('div');
        span.className = 'calendar-day-label';
        span.textContent = day;
        calendarGrid.appendChild(span);
    });

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    
    const todayStr = now.toISOString().split('T')[0].replace(/-/g, '.');

    // Padding for first day
    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day inactive';
        calendarGrid.appendChild(empty);
    }

    for (let date = 1; date <= lastDate; date++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        const dateStr = `${year}.${String(month + 1).padStart(2, '0')}.${String(date).padStart(2, '0')}`;
        
        if (dateStr === todayStr) dayDiv.classList.add('today');
        
        dayDiv.textContent = date;
        
        // Find +/- for this day
        const dayActions = creditHistory.filter(h => h.date === dateStr);
        if (dayActions.length > 0) {
            const dots = document.createElement('div');
            dots.className = 'dot-indicators';
            const hasEarn = dayActions.some(a => a.amount > 0);
            const hasSpend = dayActions.some(a => a.amount < 0);
            
            if (hasEarn) {
                const dot = document.createElement('span');
                dot.className = 'dot earn';
                dots.appendChild(dot);
            }
            if (hasSpend) {
                const dot = document.createElement('span');
                dot.className = 'dot spend';
                dots.appendChild(dot);
            }
            dayDiv.appendChild(dots);
        }
        
        calendarGrid.appendChild(dayDiv);
    }
}

function showDeptRanking() {
    openDeptModal();
}

function openDeptModal() {
    const modal = document.getElementById('dept-ranking-view');
    if (modal) {
        modal.classList.add('active');
        renderDeptGraph();
    }
}

function closeDeptModal() {
    const modal = document.getElementById('dept-ranking-view');
    if (modal) {
        modal.classList.remove('active');
    }
}

function renderDeptGraph() {
    const container = document.getElementById('dept-graph-svg');
    if (!container) return;
    
    container.innerHTML = '';
    const width = 300;
    const height = 150;
    const padding = 30;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Find Max for scaling
    const allPoints = deptGrowthData.datasets.flatMap(d => d.points);
    const maxVal = Math.max(...allPoints) * 1.1;
    
    // Draw Axis
    const axis = `
        <line x1="${padding}" y1="${height-padding}" x2="${width-padding}" y2="${height-padding}" class="chart-axis" />
        <line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height-padding}" class="chart-axis" />
    `;
    container.insertAdjacentHTML('beforeend', axis);
    
    // Draw Labels
    deptGrowthData.labels.forEach((label, i) => {
        const x = padding + (i * (chartWidth / (deptGrowthData.labels.length - 1)));
        container.insertAdjacentHTML('beforeend', `
            <text x="${x}" y="${height-padding+15}" class="chart-label" text-anchor="middle">${label}</text>
        `);
    });

    // Draw Lines & Points
    deptGrowthData.datasets.forEach(dept => {
        let pathData = "";
        dept.points.forEach((p, i) => {
            const x = padding + (i * (chartWidth / (dept.points.length - 1)));
            const y = height - padding - (p / maxVal * chartHeight);
            
            if (i === 0) pathData += `M ${x} ${y}`;
            else pathData += ` L ${x} ${y}`;
            
            // Draw circle point
            container.insertAdjacentHTML('beforeend', `
                <circle cx="${x}" cy="${y}" r="4" class="chart-point" stroke="${dept.color}" />
            `);
        });
        
        container.insertAdjacentHTML('afterbegin', `
            <path d="${pathData}" class="chart-line" stroke="${dept.color}" style="opacity: 0.8;" />
        `);
    });

    // Generate Legend
    const legendContainer = document.getElementById('dept-legend');
    if (legendContainer) {
        legendContainer.innerHTML = deptGrowthData.datasets.map(dept => `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${dept.color};"></div>
                <span>${dept.name}</span>
            </div>
        `).join('');
    }
}

function updateMyPageStats() {
    const countEl = document.getElementById('mypage-likes-count');
    if (countEl) {
        countEl.textContent = likedItemIds.length;
    }
}

function renderHomeMissions() {
    const container = document.getElementById('home-mission-list');
    if (!container) return;
    container.innerHTML = '';
    missions.forEach(mission => {
        const isCompleted = completedMissionIds.includes(mission.id);
        const card = document.createElement('div');
        card.className = `mission-card ${isCompleted ? 'completed' : ''}`;
        card.innerHTML = `
            ${isCompleted ? '<div class="completion-overlay"><div class="check-icon">✅</div><span>Clear</span></div>' : ''}
            <h4>${mission.title}</h4>
            <p>${mission.description}</p>
            <div class="mission-action">
                <span class="reward">+${mission.reward} 크레딧</span>
                <button class="wire-btn mini-btn" onclick="jumpToMission(${mission.id})">인증하러 가기</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderMissionList() {
    const container = document.getElementById('mission-list-container');
    if (!container) return;
    const fileInput = document.getElementById('mission-file-input');
    container.innerHTML = '';
    if (fileInput) container.appendChild(fileInput);
    missions.forEach(mission => {
        const isCompleted = completedMissionIds.includes(mission.id);
        const item = document.createElement('div');
        item.className = `mission-list-item ${isCompleted ? 'completed' : ''}`;
        item.id = `mission-item-${mission.id}`;
        const btnIdAttr = mission.isSpecial ? `onclick="toggleView('home-view')"` : `onclick="triggerMissionUpload(${mission.id})"`;
        const btnText = mission.isSpecial ? '물품 올리기' : '사진 업로드';
        item.innerHTML = `
            <div class="completion-overlay">
                <div class="check-icon">✅</div>
                <span>Mission Clear</span>
            </div>
            <div class="mission-list-top">
                <div class="mission-img-placeholder"></div>
                <div class="mission-info">
                    <h4>${mission.title}</h4>
                    <p>${mission.reward} 크레딧</p>
                </div>
            </div>
            <button class="wire-btn list-upload-btn" ${isCompleted ? 'disabled' : ''} ${btnIdAttr}>${isCompleted ? '완료됨' : btnText}</button>
            <div class="mission-status-container" id="status-container-${mission.id}">
                <div class="mission-progress-track">
                    <div class="mission-progress-fill" id="progress-fill-${mission.id}"></div>
                </div>
                <div class="mission-status-text" id="status-text-${mission.id}">업로드 대기 중</div>
            </div>
        `;
        container.appendChild(item);
    });
}

let selectedMissionId = null;
function triggerMissionUpload(id) {
    selectedMissionId = id;
    document.getElementById('mission-file-input').click();
}

function handleFileSelected(event) {
    if (event.target.files.length > 0 && selectedMissionId !== null) {
        simulateMissionUpload(selectedMissionId);
    }
}

function simulateMissionUpload(id) {
    const container = document.getElementById(`status-container-${id}`);
    const fill = document.getElementById(`progress-fill-${id}`);
    const text = document.getElementById(`status-text-${id}`);
    const btn = document.querySelector(`#mission-item-${id} .list-upload-btn`);
    if (!container || !fill || !text) return;
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
            fill.style.width = '100%';
            text.textContent = '업로드 완료!';
            text.classList.add('upload-complete');
            setTimeout(() => {
                fill.classList.add('waiting');
                text.textContent = '업로드 완료! 관리자의 승인을 기다리는 중...';
                text.classList.add('waiting');
                setTimeout(() => {
                    if (!completedMissionIds.includes(id)) {
                        completedMissionIds.push(id);
                        localStorage.setItem('completedMissionIds', JSON.stringify(completedMissionIds));
                    }
                    renderHomeMissions();
                    renderMissionList();
                }, 3000);
            }, 1000);
        } else {
            fill.style.width = `${progress}%`;
            text.textContent = `업로드 중... ${progress}%`;
        }
    }, 150);
}

function jumpToMission(id) {
    toggleView('mission-view');
    setTimeout(() => {
        const target = document.getElementById(`mission-item-${id}`);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') sendMessage();
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
