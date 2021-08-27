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
	var sql;
	if(req.query.id){
		sql = 'select * from table_shop where id = ?';
	}
	else{
		sql = 'select * from table_shop';
	}
	pool.query(sql, [req.query.id], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200,
				message: '查询成功',
				result:result
			});
		} else {
			res.send({
				code: 201,
				message: '查询失败'
			});
		}
	});
});

//商户登录
r.post("/login", (req, res, next) => {
	var sql = 'select s.* from table_shop_account sa left join table_shop s on sa.id = s.id  where (sa.account = ? and sa.password = md5(?)) and sa.isDel = 0';
	pool.query(sql, [req.body.account,req.body.password], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200,
				message: '查询成功',
				result:result
			});
		} else {
			res.send({
				code: 201,
				message: '查询失败'
			});
		}
	});
});

//商户业务查询
r.post("/order_info", (req, res, next) => {
	var sql = 'select o.* from table_order o left join table_shop s on o.businessid = s.id where o.businessid = ? and date(o.time) = curdate()';
	pool.query(sql, [req.body.businessid], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200,
				message: '查询成功',
				result:result
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