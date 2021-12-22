const hs = require("http-status");
const { list, insert } = require("../services/Users");
const { passwordToHash } = require("../scripts/utils/helper");

const index = (req, res) => {
  console.log("User Index");

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

module.exports = {
  index,
  create,
};
