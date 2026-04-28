const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('./config/database');
const Product = require('./models/Product');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Dummy Data Seed
const initialProducts = [
    { title: "빈티지 조명", price: "2500", x: 48, y: 52, isUserOwned: true, recipientName: "이지오", description: "상태 좋은 빈티지 조명입니다. 이사가게 되어 더 이상 필요하지 않아 나눔합니다. 실사용 기간은 1년 정도이며, 따뜻한 노란색 조명이 들어와서 방 분위기를 무드 있게 만들어줍니다. 인하대 정문 쪽에서 직거래 희망합니다!", likes: 12, views: 243, chats: 3 },
    { title: "친환경 수세미", price: "500", x: 60, y: 40, isUserOwned: true, recipientName: "김애리", description: "천연 삼베로 직접 만든 친환경 수세미입니다. 세제 없이도 기름기가 잘 닦이고 미세 플라스틱 걱정이 없습니다. 새 제품 3개 세트입니다.", likes: 5, views: 89, chats: 1 },
    { title: "리유저블 컵", price: "1200", x: 55, y: 35, isUserOwned: true, recipientName: "박준혁", description: "카페에서 받은 튼튼한 리유저블 컵입니다. 깨끗하게 세척 완료했으며, 뜨거운 음료도 가능합니다. 다회용 컵 사용으로 지구를 지켜요!", likes: 8, views: 156, chats: 2 },
    { title: "에코백", price: "800", x: 42, y: 58, description: "튼튼한 캔버스 재질의 에코백입니다. A4 사이즈 노트북도 넉넉히 들어가는 크기예요. 거의 사용하지 않아 새것 같습니다.", likes: 15, views: 312, chats: 5 },
    { title: "유리 반찬통", price: "1500", x: 38, y: 45, description: "내열 유리로 제작된 반찬통입니다. 500ml 용량이며 오븐이나 전자레인지 사용이 가능합니다. 깨끗하게 소독해 두었습니다.", likes: 4, views: 76, chats: 0 },
    { title: "스텐 빨대", price: "300", x: 65, y: 60, description: "세척 솔이 포함된 스테인리스 빨대 세트입니다. 일회용 플라스틱 빨대 대신 사용해 보세요. 위생적이고 반영구적입니다.", likes: 20, views: 420, chats: 8 },
    { title: "대나무 칫솔", price: "400", x: 40, y: 30, description: "낱개 포장된 미개봉 대나무 칫솔입니다. 생분해되는 소재로 환경에 무해합니다. 여행용이나 손님용으로 추천드려요.", likes: 6, views: 102, chats: 2 },
    { title: "고체 샴푸바", price: "1000", x: 70, y: 48, description: "플라스틱 용기가 없는 고체 샴푸입니다. 약산성 소재로 두피에 자극이 없고 세정력이 좋습니다. 새 제품입니다.", likes: 10, views: 245, chats: 4 },
    { title: "천연 비누", price: "600", x: 45, y: 65, description: "핸드메이드 어성초 비누입니다. 여드름이나 민감성 피부에 좋습니다. 인공 향료가 들어가지 않은 순한 제품입니다.", likes: 7, views: 134, chats: 1 }
];

// Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        // Rename properties to match frontend expectation (stats nested)
        const formattedProducts = products.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            x: p.x,
            y: p.y,
            isUserOwned: p.isUserOwned,
            recipientName: p.recipientName,
            description: p.description,
            stats: {
                likes: p.likes,
                views: p.views,
                chats: p.chats
            }
        }));
        res.json(formattedProducts);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Database Initialization
sequelize.sync().then(async () => {
    console.log('Database synced');
    const count = await Product.count();
    if (count === 0) {
        console.log('Seeding initial products...');
        await Product.bulkCreate(initialProducts);
        console.log('Seed complete');
    }

    // Server Initialization
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Database sync error:', err);
});
