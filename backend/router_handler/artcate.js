const db = require('../db/index')


// Get the processing function of the article classification list data
exports.getArticleCates = (req, res) => {
    const sql = 'select * from ArticleCate where isDelete=0 order by cateId asc'
    db.all(sql, (err, results) => {
        // 1. Failed to execute SQL statement
        if (err) return res.cc(err)
        // 2. SQL statement executed successfully
        res.send({
            status: 0,
            message: 'Get the article category list successfully!',
            data: results,
        })
    })
}

// Added processing function for article classification
exports.addArticleCates = (req, res) => {
    // 1. Define the SQL statement for duplicate checking
    const sql = `select * from ArticleCate where name=? or alias=?`
    // 2. SQL statement to perform duplication check
    db.all(sql, [req.body.name, req.body.alias], (err, results) => {
        // 3. Determine whether the execution of the SQL statement fails
        if (err) return res.cc(err)

        // 4.1 Determine the length of the data
        if (results.length === 2) return res.cc('The category name and category alias are occupied, please change and try again!')
        // 4.2 Three cases where length is equal to 1
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('The category name and category alias are occupied, please change and try again!')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('The category name is occupied, please change and try again!')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('The category alias is occupied, please change and try again!')

        // Define the SQL statement to insert the article category
        const sql = `insert into ArticleCate(name, alias) values(?,?)`
        // Execute the SQL statement that inserts the article category
        db.run(sql, [req.body.name, req.body.alias], (err, results) => {
            if (err) return res.cc(err)
            res.cc('The newly added article is classified successfully!', 0)
        })
    })

}

// 删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
    // 定义标记删除的 SQL 语句
    const sql = `update ArticleCate set isDelete=1 where cateId=?`
    // 调用 db.query() 执行 SQL 语句
    db.run(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        res.cc('Delete the article category successfully!', 0)
    })
}

// 根据 Id 获取文章分类的处理函数
exports.getArticleById = (req, res) => {
    // 定义根据 ID 获取文章分类数据的 SQL 语句
    const sql = `select * from ArticleCate where cateId=?`
    // 调用 db.query() 执行 SQL 语句
    db.all(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('Failed to get article classification data!')
        res.send({
            status: 0,
            message: 'Get the article classification data successfully!',
            data: results[0],
        })
    })
}

// Update the processing function of the article classification
exports.updateCateById = (req, res) => {
    // Define the SQL statement for duplicate checking
    const sql = `select * from ArticleCate where cateId<>? and (name=? or alias=?)`
    // Call db.query() to execute the SQL statement for duplicate check
    db.all(sql, [req.body.cateId, req.body.name, req.body.alias], (err, results) => {
        // Failed to execute SQL statement
        if (err) return res.cc(err)

        // 4 situations in which names and aliases are occupied
        if (results.length === 2) return res.cc('The category name and alias are occupied, please change and try again!')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('The category name is occupied, please change and try again!')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('The category alias is occupied, please change and try again!')
        // Define the SQL statement to update the article classification
        const sql = `update ArticleCate set cateId=?,name=?,alias=? where cateId=?`

        // Execute the SQL statement to update the article classification
        db.run(sql, [req.body.cateId, req.body.name, req.body.alias, req.body.cateId], (err, results) => {
            if (err) return res.cc(err)
            res.cc('Successfully updated the article classification!', 0)
        })
    })
}