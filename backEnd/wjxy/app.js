//导入需要资源
const express = require('express');
const fs = require('fs');
const querystring = require('querystring');
const userRouter = require('./routes/user.js');
const goodsRouter = require('./routes/goods.js');
const shopRouter = require('./routes/shop_info.js');
const cors = require('cors')

//创建服务，端口5050
const app = express();
app.use(cors({
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080']
}));
const port = 5050;
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});

//加载静态文件夹
app.use(express.static('public'));

//req.body解析中间件
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

//user路由
app.use('/user', userRouter);
app.use('/goods', goodsRouter);
app.use('/shop', shopRouter);
module.exports = app;