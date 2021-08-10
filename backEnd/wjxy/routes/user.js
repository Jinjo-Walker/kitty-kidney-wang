//导入资源
const express = require('express');
const pool = require('../pool.js');
const tencentcloud = require("tencentcloud-sdk-nodejs");
const SmsClient = tencentcloud.sms.v20210111.Client;
//创建路由
const r = express.Router();

function send(num) {
	return new Promise((reslove, reject) => {
		const clientConfig = {
			credential: {
				secretId: "AKIDObZ0FFzUkkU2MRGrCH6fy2sSntkPq2zi",
				secretKey: "XpsfCVZNwHNDn8E5h3A0bw2tWt1uXv4y",
			},
			region: "ap-nanjing",
			profile: {
				httpProfile: {
					endpoint: "sms.tencentcloudapi.com",
				},
			},
		};
		let yzm = Math.floor(Math.random() * 10000);
		const client = new SmsClient(clientConfig);
		const params = {
			"PhoneNumberSet": [`+86${num}`],
			"SmsSdkAppId": "1400558463",
			"SignName": "华梦超作品分享",
			"TemplateId": "1070489",
			"TemplateParamSet": [
				`${yzm}`
			]
		};
		client.SendSms(params).then(
			(data) => {
				reslove({
					data: data,
					yzm: yzm
				});
			},
			(err) => {
				console.error("error", err);
			}
		);
	});
}

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
	var sql = 'insert into table_user(id,account,password,phone,user_name) values(null,?,?,?,?)';
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
		if (result.length == 0) {
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
		if (result.length == 0) {
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
	var sql = 'select id,account,phone,user_name from table_user where (account = ? and password = ?) and isDel = 0';
	pool.query(sql, [req.body.account, req.body.password], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200,
				message: '登录成功',
				result: result
			});
		} else {
			res.send({
				code: 201,
				message: '登录失败'
			});
		}
	});
});

//短信验证接口
r.get("/yzm", (req, res, next) => {
	send(req.query.phone).then(result => {
		console.log(result.data);
		if (result.data.SendStatusSet[0].Code == 'Ok') {
			res.send({
				code: 200,
				message: '验证成功',
				data: result.data,
				yzm: result.yzm
			});
		} else {
			res.send({
				code: 201,
				message: '验证失败'
			});
		}
	});

});

//手机登录请求
r.post("/phone_login", (req, res, next) => {
	var sql = 'select id,account,phone,user_name from table_user where (phone = ?) and isDel = 0';
	pool.query(sql, [req.body.phone], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			//短信验证接口判断
			res.send({
				code: 200,
				message: '登录成功',
				result: result
			});
		} else {
			var sql2 = 'insert into table_user(id,account,password,phone) values(null,?,?,?)';
			pool.query(sql2, [req.body.phone, '123456', req.body.phone], function (err2, result2) {
				if (err2) {
					next(err2);
					return;
				}
				if (result2.affectedRows > 0) {
					//短信验证接口判断
					res.send({
						code: 200,
						message: '新用户注册登录成功，初始密码为123456，请尽快修改密码。',
						result: result2
					});
				} else {
					res.send({
						code: 201,
						message: '注册登录失败'
					});
				}
			});
		}
	});
});

//账号信息查询请求
r.get("/account_info", (req, res, next) => {
	var sql = 'select id,account,phone,user_name from table_user where id = ?';
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

//更新用户信息
r.put("/account_change", (req, res, next) => {
	var sql = 'update table_user set ? where id = ?';
	pool.query(sql, [req.body, req.body.id], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.affectedRows > 0) {
			res.send({
				code: 200,
				message: '更新成功',
				result: result
			});
		} else {
			res.send({
				code: 201,
				message: '更新失败'
			});
		}
	});
});

//账户优惠券查询
r.post("/account_coupon", (req, res, next) => {
	var sql = 'select coupon from table_coupon where userid = ?';
	pool.query(sql, [req.body.id], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			res.send({
				code: 200,
				message: '优惠券查询成功',
				result: result
			});
		} else {
			res.send({
				code: 201,
				message: '优惠券查询失败'
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