const hs = require("http-status");
const { list, insert, findOne } = require("../services/Users");
const { passwordToHash, generateJWTAccessToken, generateJWTRefreshToken } = require("../scripts/utils/helper");

const index = (req, res) => {
  list()
    .then((userList) => {
      if (!userList) res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var..." });
      res.status(hs.OK).send(userList);
    })
    .catch((err) => res.status(ha.INTERNAL_SERVER_ERROR).send(err));
};

const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  insert(req.body)
    .then((createdUser) => {
      if (!createdUser) res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var..." });
      res.status(hs.OK).send(createdUser);
    })
    .catch((err) => res.status(hs.INTERNAL_SERVER_ERROR).send(err));
};

const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  findOne(req.body)
    .then((user) => {
      if (!user) return res.status(hs.NOT_FOUND).send({ message: "Böyle bir kullanıcı bulunmamaktadır" });
      user = {
        ...user.toObject(),
        tokens: {
          access_token: generateJWTAccessToken(user),
          refresh_token: generateJWTRefreshToken(user),
        },
      };

      delete user.password;
      res.status(hs.OK).send(user);
    })
    .catch((err) => res.status(hs.INTERNAL_SERVER_ERROR).send(err));
};

module.exports = {
  index,
  create,
  login,
};
