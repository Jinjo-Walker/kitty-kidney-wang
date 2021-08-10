//导入资源
const express = require('express');
const pool = require('../pool.js');
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

//查询商户
r.get("/shop_info", (req, res, next) => {
	var sql = 'select * from table_user where id = ?';
	pool.query(sql, [req.query.id], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200,
				message: '查询成功'
			});
		} else {
			res.send({
				code: 201,
				message: '查询失败'
			});
		}
	});
});

//导出路由
module.exports = r;