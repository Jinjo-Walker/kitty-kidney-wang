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

//添加订单
r.post("/order_add", (req, res, next) => {
	var sql = 'insert into table_order(userid,orderid,businessid,type,total) values(?,null,1,1,?)';
	pool.query(sql, [req.body.id, req.body.total], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.affectedRows > 0) {
			var str = req.body.str.split("|");
			var sql2 = 'insert into table_menu_commodity values';
			let count = 0;
			for (var i of str) {
				let str2 = i.split(",");
				if(count == 0){
					sql2+=`(${result.insertId},${str2[0]},${str2[1]},${str2[2]})`;
				}
				else{
					sql2+=`,(${result.insertId},${str2[0]},${str2[1]},${str2[2]})`;
				}
				count++;
			}
			pool.query(sql2, [], function (err2, result2) {
				if (err2) {
					next(err2);
					return;
				}
				if (result2.affectedRows > 0) {
					res.send({
						code: 200,
						message: '订单插入成功',
						result: result2
					});
				} else {
					res.send({
						code: 201,
						message: '订单插入失败'
					});
				}
			});

		} else {
			res.send({
				code: 201,
				message: '查询失败'
			});
		}
	});
});

//查询订单
r.get("/order_info", (req, res, next) => {
	var sql = 'select o.*,s.address from table_order o left join table_shop s on o.businessid = s.id where o.userid = ? order by o.time desc';
	pool.query(sql, [req.query.id], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200,
				message: '查询成功',
				result: result
			});
		} else {
			res.send({
				code: 201,
				message: '查询失败'
			});
		}
	});
});

//查询订单商品信息
r.get("/orderMenu_info", (req, res, next) => {
	var sql = 'select mc.*,m.cname,m.picture from table_menu_commodity mc left join table_menu m on mc.menuid = m.cid where mc.commodityid = ?';
	pool.query(sql, [req.query.cid], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200,
				message: '查询成功',
				result: result
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