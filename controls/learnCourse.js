const mysql = require('mysql');
const pool = mysql.createPool({
      host: 'localhost',
        user: 'root',
          password: 'shanannan521',
            database: 'zhangnan'
})
const query = function( sql, values = [] ) {
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
    getLearnedCourse(req, res) {
        const {userId,courseId} = req.body
        const sql = `select * from user_learned_course where userId = ? and courseId = ?`
        const arr = [userId,courseId]
        query(sql,arr)
            .then(data => {
                res.json({
                    code: 200,
                    msg: '查询成功',
                    data: data
                })
            })

    },
    changeLearnedCourse(req,res) {
        console.log('请求体为',req.body)
        const {userId,courseId,detail} = req.body
        let arr = [userId,courseId]
        let sql = `select * from user_learned_course where userId = ? and courseId = ?`
        query(sql,arr)
            .then(data => {
                if(data.length === 0) {
                    console.log('第一次修改已学习任务详情')
                    arr = [userId,courseId,detail]
                    sql = `insert into user_learned_course (userId,courseId,detail) values (?,?,?)`
                    query(sql,arr)
                        .then(data => {
                            console.log('添加成功',data)
                            res.json({
                                code: 200,
                                msg: '第一次修改，更新成功',
                                data: data
                            })
                        })
                }else {
                    arr = [detail,userId,courseId]
                    sql = `update user_learned_course set detail = ? where userId = ? and courseId = ?`
                    console.log(arr,`update user_learned_course set detail = ${detail} where userId = ${userId} and courseId = ${courseId}`)
                    query(sql,arr)
                        .then(data => {
                            console.log('非第一次修改,修改成功')
                            res.json({
                                code: 200,
                                msg: '不是第一次修改，修改完成',
                                data: data
                            })
                        })
                }
            })
    },
    changeLearnedTime(req,res) {
        const {learnedTime, userId} = req.body
        console.log('当前学习时长为',learnedTime)
        let arr = [learnedTime,userId]
        let sql = `update user_list set learnedTime = ? where userId = ?`
        query(sql,arr)
            .then(data => {
                console.log('修改学习时长成功')
                res.json({
                    code: 200,
                    msg: '修改学习时长成功'
                })
            })
            .catch(err => {
                res.json({
                    msg: 202,
                    msg: '更新错误，数据库发生问题'
                })
            })
    }
}
