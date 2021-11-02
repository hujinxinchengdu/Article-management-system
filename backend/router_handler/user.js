const db = require('../db/index')
const bcrypt = require('bcryptjs')
// Use this package to generate Token string
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {

    // Receive form data
    const userinfo = req.body;
    // Determine whether the data is legal
    // if (!userinfo.username || !userinfo.password) {
    //     return res.cc('User name or password cannot be empty! ')
    // }

    const sql = `select * from Users where userName=?`

    db.all(sql, [userinfo.username], function (err, results) {
        // Failed to execute SQL statement
        if (err) {
            return res.cc(err)
        }
        // Username is taken
        if (results.length > 0) {
            return res.cc('The username is occupied, please change another username!')
        }
        // Perform bcrype encryption on the user's password, and the return value is the encrypted password string
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sql = 'insert into Users(userName,password) values(?,?)'

        db.run(sql, [userinfo.username, userinfo.password],
            function (err) {
                // Failed to execute SQL statement
                if (err) return res.cc(err)
                // registration success
                res.send({ status: 0, message: 'registration success!' })
            })
    })
}
// Registered processing function
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = `select * from Users where userName=?`
    db.all(sql, userinfo.username, function (err, results) {
        // Failed to execute SQL statement
        if (err) return res.cc(err)
        // The SQL statement is executed successfully, but the number of data items queried is not equal to 1
        if (results.length !== 1) return res.cc('invalid username or password!')
        // Take the password entered by the user and compare it with the password stored in the database
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // If the result of the comparison is equal to false, it proves that the password entered by the user is wrong
        if (!compareResult) {
            return res.cc('invalid username or password!')
        }
        // After culling, only the user’s id, username, nickname, and email values ​​are retained in user.
        const user = { ...results[0], password: '', userPicture: '' }
        // Generate Token string
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn, // The token is valid for 10 hours
        })
        res.send({
            status: 0,
            message: 'login successful!',
            // In order to facilitate the use of Token by the client, the prefix of Bearer is directly spliced ​​on the server side
            token: 'Bearer ' + tokenStr,
        })
    })
}