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
