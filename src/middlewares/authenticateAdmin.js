const JWT = require("jsonwebtoken");
const hs = require("http-status");

const authenticateToken = (req, res, next) => {
  // console.log(req.headers);
  const token = req.headers?.authorization?.split(" ")[1] || null;
  if (!token) return res.status(hs.UNAUTHORIZED).send({ message: "Bu işlemi yapabilmek için öncelikle giriş yapmış olmanız gerekmektedir" });
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) return res.status(hs.FORBIDDEN).send(err);
    if (!user?._doc?.isAdmin) return res.status(hs.UNAUTHORIZED).send({ message: "Bu işlemi yapabilmek için yönetici olmanız gerekmektedir" });
    req.user = user?._doc;
    next();
  });
  // console.log("token :>> ", token);
};

module.exports = authenticateToken;
