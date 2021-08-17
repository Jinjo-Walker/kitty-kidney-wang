const mysql=require('mysql');
//创建连接池对象
const pool=mysql.createPool({
  host:'176.46.10.90',
  port:'3306',
  user:'root',
  password:'',
  database:'wyxj',
  connectionLimit:'20'
});
//导出连接池对象
module.exports=pool;