//导入需要资源
const express = require('express');
const fs = require('fs');
const querystring = require('querystring');
const userRouter = require('./routes/user.js');

//创建服务，端口5050
const app = express();
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

module.exports = app;