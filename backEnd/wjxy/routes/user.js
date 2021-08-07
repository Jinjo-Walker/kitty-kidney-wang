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
	var sql = 'insert into table_user(uname,upwd,email,phone,user_name) values(?,?,?,?,?)';
	pool.query(sql, [req.body.uname, req.body.upwd, req.body.email, req.body.phone, req.body.user_name], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.affectedRows > 0) {
			res.send({
				code: 1
			});
		} else {
			res.send({
				code: 0
			});
		}
	});
});

//用户名是否存在请求
r.get("/exist", (req, res, next) => {
	var sql = 'select * from table_user where uname = ?';
	pool.query(sql, [req.query.uname], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 0
			});
		} else {
			res.send({
				code: 1
			});
		}
	});
});

//登录请求
r.post("/login", (req, res, next) => {
	var sql = 'select * from table_user where (uname = ? and upwd = ?) and isDel = 0';
	pool.query(sql, [req.body.uname, req.body.upwd], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			req.session.uid = result[0].uid;
			req.session.user_name = result[0].user_name;
			req.session.avatar = result[0].avatar;
			req.session.auth = true;
			res.send({
				code: 1
			});
		} else {
			req.session.auth = false;
			res.send({
				code: 0
			});
		}
	});
});

//注销请求
r.get("/logout", (req, res) => {
	res.send({
		code: 1,
		msg: "退出成功"
	})
});

//导出路由
module.exports = r;