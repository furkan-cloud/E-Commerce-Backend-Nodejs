const hs = require("http-status");
const { list, insert, updateDoc } = require("../services/Products");

const index = (req, res) => {
  list()
    .then((itemList) => {
      if (!itemList) res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var..." });
      res.status(hs.OK).send(itemList);
    })
    .catch((err) => res.status(ha.INTERNAL_SERVER_ERROR).send(err));
};

const create = (req, res) => {
  req.body.user_id = req.user;
  insert(req.body)
    .then((createdDoc) => {
      if (!createdDoc) res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var..." });
      res.status(hs.OK).send(createdDoc);
    })
    .catch((err) => res.status(hs.INTERNAL_SERVER_ERROR).send(err));
};
const update = (req, res) => {
  if (!req.params.id) return res.status(hs.BAD_REQUEST).send({ message: "Eksik bilgi..." });
  updateDoc(req.params.id, req.body)
    .then((updatedDoc) => {
      if (!updatedDoc) return res.status(hs.NOT_FOUND).send({ message: "ürün bulunamadı..." });
      res.status(hs.OK).send(updatedDoc);
    })
    .catch((err) => res.status(hs.INTERNAL_SERVER_ERROR).send(err));
};

module.exports = {
  index,
  create,
  update,
};
