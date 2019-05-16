const mysql = require('mysql');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'shanannan521',
  database: 'zhangnan'
})
const query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}
module.exports = {
  login(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const sql = 'select * from user_list where username = ? and password = ?';
    const arr = [req.body.username,req.body.password];
    query(sql,arr)
      .then(data => {
          if(data.length > 0)
            res.json({
                code: 200,
                msg: 'ok',
                data: data
            });
          else
            res.json({
                code: 200,
                msg: '密码错误',
            })
      })
      .catch((err) => {
          res.json({
            code: 201,
            msg: '数据库查找失败'
          })
      })
  },
  register() {
    const username = req.body.username;
    const password = req.body.password;
    const sql = 'insert into users (username, password) values ( ?, ?)';
    const arr = [req.body.username,req.body.password];
    query(sql,arr)
      .then(data => {
        res.json({
            code: 200,
            msg: '创建成功',
            data: data
        })
      })
      .catch((err) => {
          res.json({
            code: 201,
            msg: '创建账号失败,请重试',
            data: err
          })
      })
  }
}
