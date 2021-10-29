const sqlite3 = require("sqlite3");
const db = new sqlite3.Database('./db/project01.db')

// Share db database connection objects externally
module.exports = db