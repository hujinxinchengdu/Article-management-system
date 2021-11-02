// 导入处理路径的 path 核心模块
const path = require('path')
const db = require('../db/index')

// 发布新文章的处理函数
exports.addArticle = (req, res) => {
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'coverImg') return res.cc('文章封面是必选参数！')
    // TODO：表单数据合法，继续后面的处理流程...

    const articleInfo = {
        // 标题、内容、状态、所属的分类Id
        ...req.body,
        // 文章封面在服务器端的存放路径
        coverImg: path.join('/uploads', req.file.filename),
        // 文章发布时间
        pubDate: new Date(),
        // 文章作者的Id
        userId: req.user.userId,
    }

    console.log(articleInfo)

    var sql = `insert into Articles(title, content,coverImg,pubDate,status,userId) values(?,?,?,?,?,?)`

    // 执行 SQL 语句
    db.run(sql, [
        articleInfo.title,
        articleInfo.content,
        articleInfo.coverImg,
        articleInfo.pubDate,
        articleInfo.state,
        articleInfo.userId
    ], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
    })
    sql = 'select last_insert_rowid() as id'
    db.all(sql, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        console.log(results)
        sql = 'insert into Belong(cateId,articleId) values(?,?)'
        db.run(sql, [articleInfo.cateId, results[0].id], (err) => {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
            // 发布文章成功
            res.cc('发布文章成功', 0)
        })

    })

}
