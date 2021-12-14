const hs = require("http-status");
const { list, insert } = require("../services/Users");

const index = (req, res) => {
  console.log("User Index");
  list()
    .then((userList) => {
      if (!userList)
        res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var..." });
      res.status(hs.OK).send(userList);
    })
    .catch((err) => res.status(ha.INTERNAL_SERVER_ERROR).send(e));
  res.status(hs.OK).send({ message: "User Index" });
};

const create = (req, res) => {
  insert()
    .then((createdUser) => {
      if (!createdUser)
        res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var..." });
      res.status(hs.OK).send(createdUser);
    })
    .catch((err) => res.status(ha.INTERNAL_SERVER_ERROR).send(e));
  res.status(hs.OK).send({ message: "User Index" });
};

module.exports = {
  index,
  create,
};
