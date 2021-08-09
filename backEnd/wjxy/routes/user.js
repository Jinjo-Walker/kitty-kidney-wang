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

//注册请求
r.post("/reg", (req, res, next) => {
	var sql = 'insert into table_user(id,account,password,phone,user_name) values(?,?,?,?,?)';
	pool.query(sql, [req.body.account, req.body.password, req.body.phone, req.body.user_name], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.affectedRows > 0) {
			res.send({
				code: 200,
				message: '注册成功'
			});
		} else {
			res.send({
				code: 201,
				message: '注册失败'
			});
		}
	});
});

//用户名是否存在请求
r.get("/account_exist", (req, res, next) => {
	var sql = 'select * from table_user where account = ?';
	pool.query(sql, [req.query.account], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200,
				message: '账户可以使用'
			});
		} else {
			res.send({
				code: 201,
				message: '账户已存在'
			});
		}
	});
});

//手机号是否存在请求
r.get("/phone_exist", (req, res, next) => {
	var sql = 'select * from table_user where phone = ?';
	pool.query(sql, [req.query.phone], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200,
				message: '手机号可以使用'
			});
		} else {
			res.send({
				code: 201,
				message: '手机号已被注册'
			});
		}
	});
});

//账号登录请求
r.post("/account_login", (req, res, next) => {
	var sql = 'select * from table_user where (account = ? and password = ?) and isDel = 0';
	pool.query(sql, [req.body.account, req.body.password], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200
			});
		} else {
			res.send({
				code: 201
			});
		}
	});
});

//手机登录请求
r.post("/phone_login", (req, res, next) => {
	var sql = 'select * from table_user where (phone = ?) and isDel = 0';
	pool.query(sql, [req.body.phone], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200
			});
		} else {
			res.send({
				code: 201
			});
		}
	});
});

//注销请求
r.get("/logout", (req, res) => {
	res.send({
		code: 200,
		msg: "退出成功"
	})
});

//导出路由
module.exports = r;