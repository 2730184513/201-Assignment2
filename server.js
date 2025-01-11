const express = require('express');
const path = require('path');
const app = express();

// 提供静态文件
app.use(express.static('public'));
app.use('/data', express.static('src/data'));

// 所有路由都返回index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 