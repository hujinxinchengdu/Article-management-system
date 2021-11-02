const db = require('../db/index')


// 获取文章分类列表数据的处理函数
exports.getArticleCates = (req, res) => {
    const sql = 'select * from ArticleCate where isDelete=0 order by cateId asc'
    db.all(sql, (err, results) => {
        // 1. 执行 SQL 语句失败
        if (err) return res.cc(err)
        // 2. 执行 SQL 语句成功
        res.send({
            status: 0,
            message: 'Get the article category list successfully!',
            data: results,
        })
    })
}

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
    // 1. 定义查重的 SQL 语句
    const sql = `select * from ArticleCate where name=? or alias=?`
    // 2. 执行查重的 SQL 语句
    db.all(sql, [req.body.name, req.body.alias], (err, results) => {
        // 3. 判断是否执行 SQL 语句失败
        if (err) return res.cc(err)

        // 4.1 判断数据的 length
        if (results.length === 2) return res.cc('分类名称与分类别名被占用，请更换后重试！')
        // 4.2 length 等于 1 的三种情况
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与分类别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

        // 定义插入文章分类的 SQL 语句
        const sql = `insert into ArticleCate(name, alias) values(?,?)`
        // 执行插入文章分类的 SQL 语句
        db.run(sql, [req.body.name, req.body.alias], (err, results) => {
            if (err) return res.cc(err)
            res.cc('新增文章分类成功！', 0)
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
        res.cc('删除文章分类成功！', 0)
    })
}

// 根据 Id 获取文章分类的处理函数
exports.getArticleById = (req, res) => {
    // 定义根据 ID 获取文章分类数据的 SQL 语句
    const sql = `select * from ArticleCate where cateId=?`
    // 调用 db.query() 执行 SQL 语句
    db.all(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取文章分类数据失败！')
        res.send({
            status: 0,
            message: '获取文章分类数据成功！',
            data: results[0],
        })
    })
}

// 更新文章分类的处理函数
exports.updateCateById = (req, res) => {
    // 定义查重的 SQL 语句
    const sql = `select * from ArticleCate where cateId<>? and (name=? or alias=?)`
    // 调用 db.query() 执行查重的 SQL 语句
    db.all(sql, [req.body.cateId, req.body.name, req.body.alias], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)

        // 判断名称和别名被占用的4种情况
        if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
        // 定义更新文章分类的 SQL 语句
        const sql = `update ArticleCate set cateId=?,name=?,alias=? where cateId=?`

        // 执行更新文章分类的 SQL 语句
        db.run(sql, [req.body.cateId, req.body.name, req.body.alias, req.body.cateId], (err, results) => {
            if (err) return res.cc(err)
            res.cc('更新文章分类成功！', 0)
        })
    })
}