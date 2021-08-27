//导入资源
const express = require('express');
const pool = require('../pool.js');
const multer = require('multer');
const uuid = require('uuid');
const tencentcloud = require("tencentcloud-sdk-nodejs");
const SmsClient = tencentcloud.sms.v20210111.Client;
const qiniu = require('qiniu');
//创建路由
const r = express.Router();

var headerConfig = multer.diskStorage({
	// destination目的地
	destination: 'public/avatar',
	// fliename 文件名 后面跟函数,函数有三个参数
	// file为当前上传的图片 
	filename: function (req, file, callback) {
		//console.log(req)
		//console.log(file)
		//  1.选找到图片的名字,并进行分割
		var nameArray = file.originalname.split('.')
		// 长度是从1开始的 索引是从0开始的
		// [1,2,3,4]长度4 -1 [nameArray.length - 1]索引
		var type = nameArray[nameArray.length - 1]

		// 新的名字 = 随机数组.照片类型
		var imageName = file.fieldname + new Date().getTime() + '.' + type;
		//fullName = imageName

		// 设置回调的内容,参数1：错误信息，参数2：图片新的名字
		callback(null, imageName)

	}
});

// 设置使用当前的配置信息
// 上传完照片后要使用的配置信息
var upload = multer({
	storage: headerConfig
})

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
		let yzm = `${Math.floor(Math.random() * 10000)}`;
		let head = '';
		if (yzm.length < 4) {
			for (var i = 0; i < 4 - yzm.length; i++) {
				head += "0";
			}
			yzm = head + yzm;
		}
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

const accessKey = 'LShK02QmaQzCny_y25-POHAindOJ5CSTAO4beKsj';
const secretKey = 'y7anmWKAfSrhZigK4772s4RDnkX2To7tFBo9_fN-';
const bucket = 'wjxy';

r.post('/token', (req, res, next) => {
	let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
	let options = {
		scope: bucket,
		expires: 3600 * 24
	};
	let putPolicy = new qiniu.rs.PutPolicy(options);
	let uploadToken = putPolicy.uploadToken(mac);
	if (uploadToken) {
		res.send({
			code: 200,
			token: uploadToken
		});
	} else {
		res.send({
			code: 201,
			token: 'error'
		});
	}
})

r.post('/upload', (req, res) => {
	var sql = 'update table_user set avatar = ? where id = ?';
	// pool.query(sql, ['http://101.34.219.80:5050/avatar/' + req.file.filename, req.body.id], function (err, result) {
	pool.query(sql, [req.body.filename, req.body.id], function (err, result) {

		if (err) {
			next(err);
			return;
		}
		if (result.changedRows > 0) {
			res.send({
				code: 200,
				message: '上传成功'
			});
		} else {
			res.send({
				code: 201,
				message: '上传失败'
			});
		}
	});
})

// r.post('/upload',
// 	upload.single('avatar'), (req, res) => {
// 		var sql = 'update table_user set avatar = ? where id = ?';
// 		// pool.query(sql, ['http://101.34.219.80:5050/avatar/' + req.file.filename, req.body.id], function (err, result) {
// 		pool.query(sql, ['http://localhost:5050/avatar/' + req.file.filename, req.body.id], function (err, result) {

// 			if (err) {
// 				next(err);
// 				return;
// 			}
// 			if (result.changedRows > 0) {
// 				res.send({
// 					code: 200,
// 					message: '上传成功',
// 					url: 'http://localhost:5050/avatar/' + req.file.filename
// 				});
// 			} else {
// 				res.send({
// 					code: 201,
// 					message: '上传失败'
// 				});
// 			}
// 		});
// 	})


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
	var sql = 'select id,account,phone,avatar,VIP,user_name from table_user where (account = ? and password = md5(?)) and isDel = 0';
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
		console.log(result);
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
	var sql = 'select id,account,phone,avatar,VIP,user_name from table_user where (phone = ?) and isDel = 0';
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
			var sql2 = 'insert into table_user(id,account,password,phone) values(null,?,md5(123456),?)';
			pool.query(sql2, [req.body.phone, req.body.phone], function (err2, result2) {
				if (err2) {
					next(err2);
					return;
				}
				if (result2.affectedRows > 0) {
					var sql3 = 'select id,account,phone,avatar,VIP,user_name from table_user where id = ? and isDel = 0';
					pool.query(sql3, [result2.insertId], function (err3, result3) {
						if (err3) {
							next(err3);
							return;
						}
						if (result3.length > 0) {
							//短信验证接口判断
							res.send({
								code: 200,
								message: '新用户注册登录成功，初始密码为123456，请尽快修改密码。',
								result: result3
							});
						} else {
							res.send({
								code: 202,
								message: '注册登录失败'
							});
						}
					});
				} else {
					res.send({
						code: 201,
						message: '信息录入失败'
					});
				}
			});
		}
	})
});

//账号信息查询请求
r.get("/account_info", (req, res, next) => {
	var sql = 'select id,account,phone,avatar,VIP,user_name from table_user where id = ?';
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

//更新用户基本信息
r.put("/account_change", (req, res, next) => {
	var sql = 'update table_user set user_name = ? where id = ?';
	pool.query(sql, [req.body.user_name, req.body.id], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.affectedRows > 0) {
			res.send({
				code: 200,
				message: '用户名更新成功',
				result: result,
				user_name: req.body.user_name
			});
		} else {
			res.send({
				code: 201,
				message: '用户名更新失败'
			});
		}
	});
});

//更新用户密码、手机
r.put("/account_private", (req, res, next) => {
	var sql;
	var sql2;
	var arr = [];
	var arr2 = [];
	if (req.body.old_phone) {
		sql = 'select id from table_user where phone = ? and id = ?';
		sql2 = 'update table_user set phone = ? where id = ?';
		arr.push(req.body.old_phone);
		arr2.push(req.body.new_phone);
	} else if (req.body.old_password) {
		sql = 'select id from table_user where password = md5(?) and id = ?';
		sql2 = 'update table_user set password = md5(?) where id = ?';
		arr.push(req.body.old_password);
		arr2.push(req.body.new_password);
	}
	arr.push(req.body.id);
	arr2.push(req.body.id);
	pool.query(sql, arr, function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.length > 0) {
			pool.query(sql2, arr2, function (err, result) {
				if (err) {
					next(err);
					return;
				}
				if (result.affectedRows > 0) {
					res.send({
						code: 200,
						message: '更新成功',
						result: result,
						new: arr2[0]
					});
				} else {
					res.send({
						code: 202,
						message: '更新失败'
					});
				}
			});
		} else {
			res.send({
				code: 201,
				message: '信息错误，更新失败'
			});
		}
	});
});

//账户优惠券查询
r.post("/account_coupon", (req, res, next) => {
	var sql = 'select c.* from table_user_coupon uc left join table_coupon c on uc.couponid = c.couponid where uc.userid = ?';
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

//账户优惠券领取
r.get("/coupon_recive", (req, res, next) => {
	var sql = 'select * from table_user_coupon where couponid = ? and userid = ?';
	pool.query(sql, [req.query.couponid, req.query.id], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (!(result.length > 0)) {
			var sql = 'insert into table_user_coupon  values(?,?)';
			pool.query(sql, [req.query.id, req.query.couponid], function (err, result) {
				if (err) {
					next(err);
					return;
				}
				if (result.affectedRows > 0) {
					res.send({
						code: 200,
						message: '优惠券领取成功',
						result: result
					});
				} else {
					res.send({
						code: 202,
						message: '优惠券领取失败'
					});
				}
			});
		} else {
			res.send({
				code: 201,
				message: '优惠券已领取,无法重复领取!'
			});
		}
	});
});
//全部优惠券查询
r.get("/coupon_search", (req, res, next) => {
	var sql = 'select * from table_coupon';
	pool.query(sql, [], function (err, result) {
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
//订单删除
r.get("/order_delete", (req, res, next) => {
	var sql = 'delete table_order,table_menu_commodity from table_order inner join table_menu_commodity on table_order.orderid = table_menu_commodity.commodityid where table_order.orderid =?';
	pool.query(sql, [req.query.orderid, req.query.orderid], function (err, result) {
		if (err) {
			next(err);
			return;
		}
		if (result.affectedRows > 0) {
			res.send({
				code: 200,
				message: '优惠券删除成功',
			});
		} else {
			res.send({
				code: 201,
				message: '优惠券删除失败'
			});
		}
	});
})


//注销请求
r.get("/logout", (req, res) => {
	res.send({
		code: 200,
		msg: "退出成功"
	})
});

//导出路由
module.exports = r;