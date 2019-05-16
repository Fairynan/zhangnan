let mysql = require('mysql');
let db = require('../sql/db');
let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'shanannan521',
    database: 'zhangnan'
});

module.exports = {
  getArticleList(req, res) {
      console.log(req.body);
      // let sql = `select * from article_list`
      const sql = req.body.article_tag ? `select article_id article_summary article_create_time article_title from article_list where article_tag = ${req.body.article_tag}` : `select * from article_list`
      pool.getConnection((err, conn) => {
        conn.query(sql, (err, rows) => {
           // console.log(rows)
            conn.release()
          rows = [...rows].map(item => item = JSON.parse(JSON.stringify(item,["article_title","article_create_time","article_summary","article_id"])));
          res.json({
              code: 200,
              msg: '请求成功',
              article_list: rows
          })
        })
      })
  },
  getArticleDetails(req, res) {
      console.log(req.body);
      const sql = `select * from article_list where article_id = ${req.body.article_id}`;
      pool.getConnection((err, conn) => {
        conn.query(sql, (err, row) => {
          conn.release()
          row = JSON.parse(JSON.stringify(row[0],["article_content","article_id"]));
          res.json({
              code: 200,
              msg: '请求成功',
              article: row
          })
        })
      })
    }
}
