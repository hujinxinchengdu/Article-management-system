// Import the path core module of the processing path
const path = require('path')
const db = require('../db/index')

// Processing function for publishing new articles
exports.addArticle = (req, res) => {
    // Manually determine whether the article cover is uploaded
    if (!req.file || req.file.fieldname !== 'coverImg') return res.cc('文章封面是必选参数！')

    const articleInfo = {
        // Title, content, status, category Id to which it belongs
        ...req.body,
        // The storage path of the article cover on the server side
        coverImg: path.join('/uploads', req.file.filename),
        // Article publication time
        pubDate: new Date(),
        // Id of the author of the article
        userId: req.user.userId,
    }

    console.log(articleInfo)

    var sql = `insert into Articles(title, content,coverImg,pubDate,status,userId) values(?,?,?,?,?,?)`

    // Execute SQL statement
    db.run(sql, [
        articleInfo.title,
        articleInfo.content,
        articleInfo.coverImg,
        articleInfo.pubDate,
        articleInfo.state,
        articleInfo.userId
    ], (err, results) => {
        // Failed to execute SQL statement
        if (err) return res.cc(err)
    })
    sql = 'select last_insert_rowid() as id'
    db.all(sql, (err, results) => {
        // Failed to execute SQL statement
        if (err) return res.cc(err)
        console.log(results)
        sql = 'insert into Belong(cateId,articleId) values(?,?)'
        db.run(sql, [articleInfo.cateId, results[0].id], (err) => {
            // Failed to execute SQL statement
            if (err) return res.cc(err)
            // Published the article successfully
            res.cc('Published the article successfully', 0)
        })

    })

}

// Get the processing function of the article list data
exports.getArticleLists = (req, res) => {
    console.log(req.query)
    var sql = 'select * from Articles ar,Belong be, ArticleCate arc where ar.articleId = Be.articleId and arc.cateId = Be.cateId and (ar.isDelete = 0 or ar.isDelete =\'FALSE\')order by articleId asc'
    if (req.query.cate_id === '') {
        db.all(sql, (err, results) => {
            // 1. Failed to execute SQL statement
            if (err) return res.cc(err)
            // 2. SQL statement executed successfully
            res.send({
                status: 0,
                message: 'Get the article list successfully!',
                data: results,
            })
        })
    } else {
        sql = 'select * from Articles ar,Belong be, ArticleCate arc where ar.articleId = Be.articleId and arc.cateId = Be.cateId and (ar.isDelete = 0 or ar.isDelete =\'FALSE\') and arc.cateId=? order by ar.articleId asc'
        db.all(sql, req.query.cate_id, (err, results) => {
            // 1. Failed to execute SQL statement
            if (err) return res.cc(err)
            // 2. SQL statement executed successfully
            res.send({
                status: 0,
                message: 'Get the article list successfully!',
                data: results,
            })
        })
    }
}

// Delete the processing function of the article category
exports.deleteArticleById = (req, res) => {
    // Define the SQL statement for mark deletion
    const sql = `update Articles set isDelete=1 where articleId=?`
    // Call db.query() to execute SQL statement
    db.run(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        res.cc('The article was deleted successfully!', 0)
    })
}

