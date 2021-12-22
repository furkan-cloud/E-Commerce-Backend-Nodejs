const CryptoJS = require("crypto-js");

const passwordToHash = (password) => {
  const hashKey = CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString();
  return CryptoJS.HmacSHA256(password, hashKey).toString();
};

module.exports = {
  passwordToHash,
};
