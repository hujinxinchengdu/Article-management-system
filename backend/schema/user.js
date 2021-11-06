const joi = require("joi");
/**
 * string() value must be a string
 * The value of alphanum() can only be a string containing a-zA-Z0-9
 * min(length) minimum length
 * max(length) maximum length
 * required() value is required and cannot be undefined
 * pattern (regular expression) value must conform to the rules of regular expression
 */
// Username verification rules
const username = joi.string().alphanum().min(1).max(15).required();

const password = joi
  .string()
  .pattern(/^[\S]{6,18}$/)
  .required();

// 定义 id, nickname, emial 的验证规则
const userId = joi.number().integer().min(1).required();
const nickName = joi.string().required();
const email = joi.string().email().required();


// 定义 id, nickname, emial 的验证规则
const userId = joi.number().integer().min(1).required();
const nickName = joi.string().required();
const email = joi.string().email().required();

exports.reg_login_schema = {
  body: {
    username,
    password,
  },
};

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
  body: {
    userId,
    nickName,
    email,
  },
};

// 验证规则对象 - 重置密码
exports.update_password_schema = {
  body: {
    // 使用 password 这个规则，验证 req.body.oldPwd 的值
    oldPwd: password,
    // 使用 joi.not(joi.ref('oldPwd')).concat(password) 规则，验证 req.body.newPwd 的值
    // 解读：
    // 1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
    // 2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
    // 3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
    newPwd: joi.not(joi.ref('oldPwd')).concat(password),
  },
}