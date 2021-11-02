// Import database operation module
const db = require("../db/index");

// Processing function for obtaining basic user information
exports.getUserInfo = (req, res) => {
  // According to the user's id, query the user's basic information
  // Note: In order to prevent the user's password from leaking, the password field needs to be excluded
  const sql = `select userId, userName, nickName, email, userPicture from Users where userId=?`;
  // Note: The user attribute on the req object is successfully parsed by the Token, and the express-jwt middleware helped us mount it
  db.all(sql, req.user.userId, (err, results) => {
    // 1. Failed to execute SQL statement
    if (err) return res.cc(err);
    // console.log(req.user);
    // 2. Respond user information to the client
    res.send({
      status: 0,
      message: "Get user basic information successfully！",
      data: results[0],
    });
  });
};

// Processing function for updating user's basic infomation
exports.updateUserInfo = (req, res) => {
  // Define the SQL statement to be executed:
  // const sql = `update Users set ? where userId=?`;
  const sql = `update Users set userId=?, nickName=?, email=? where userId=?`;
  db.run(
    sql,
    [req.body.userId, req.body.nickName, req.body.email, req.body.userId],
    (err, results) => {
      // 1. Failed to execute SQL statement
      if (err) return res.cc(err);

      // 2. Succeed to update the user info
      return res.cc("Succeed to update the user information!", 0);
    }
  );
};
