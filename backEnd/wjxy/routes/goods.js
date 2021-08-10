//导入资源
const express = require('express');
const pool = require('../pool.js');
const tencentcloud = require("tencentcloud-sdk-nodejs");
const SmsClient = tencentcloud.sms.v20210111.Client;
//创建路由
const r = express.Router();

//req.body解析中间件
r.use(express.urlencoded({
	extended: false
}));

//服务器错误处理中间件
r.use((err, req, res, next) => {
	console.log(err);
	res.send({
		code: 500,
		msg: '服务器错误'
	});
});


//商品列表
r.get("/goods", (req, res, next) => {
	var sql = 'select * from xxx where xxx = ?';
	pool.query(sql, [req.query.xxx], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200,
				result:result
			});
		} 
	});
});

//导出路由
module.exports = r;