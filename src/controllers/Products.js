const hs = require("http-status");
const { list, insert, findOne, updateDoc } = require("../services/Products");
const path = require("path");
const { checkSecureFile } = require("../scripts/utils/helper");

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

const addComment = (req, res) => {
  if (!req.params.id) return res.status(hs.BAD_REQUEST).send({ message: "Eksik bilgi..." });
  findOne({ _id: req.params.id })
    .then((mainProduct) => {
      if (!mainProduct) return res.status(hs.NOT_FOUND).send({ message: "ürün bulunamadı..." });
      console.log("mainProduct :>> ", mainProduct);
      const comment = {
        ...req.body,
        created_at: new Date(),
        user_id: req.user,
      };
      mainProduct.comments.push(comment);
      // mainProduct.save().then(updatedDoc) bu da kullanılabilir
      updateDoc(req.params.id, mainProduct)
        .then((updatedDoc) => {
          if (!updatedDoc) return res.status(hs.NOT_FOUND).send({ message: "ürün bulunamadı..." });
          res.status(hs.OK).send(updatedDoc);
        })
        .catch((err) => res.status(hs.INTERNAL_SERVER_ERROR).send(err));
    })
    .catch((err) => res.status(hs.INTERNAL_SERVER_ERROR).send(err));
};

const addMedia = (req, res) => {
  if (!req.params.id || !req.files?.file || !checkSecureFile(req?.files?.file?.mimetype)) return res.status(hs.BAD_REQUEST).send({ message: "Eksik bilgi..." });
  console.log(`req.files`, req.files);
  findOne({ _id: req.params.id }).then((mainProduct) => {
    if (!mainProduct) return res.status(hs.NOT_FOUND).send({ message: "ürün bulunamadı..." });
    // const fileName = mainProduct._id?.toString();
    const extension = path.extname(req.files.file.name);
    const fileName = `${mainProduct._id?.toString()}${extension}`;
    const folderPath = path.join(__dirname, "../", "uploads/products", fileName);
    req.files.file.mv(folderPath, function (err) {
      if (err) return res.status(hs.INTERNAL_SERVER_ERROR).send(err);
      mainProduct.media = fileName;
      updateDoc(req.params.id, mainProduct)
        .then((updatedDoc) => {
          if (!updatedDoc) return res.status(hs.NOT_FOUND).send({ message: "ürün bulunamadı..." });
          res.status(hs.OK).send(updatedDoc);
        })
        .catch((err) => res.status(hs.INTERNAL_SERVER_ERROR).send(err));
    });
  });
};

module.exports = {
  index,
  create,
  update,
  addComment,
  addMedia,
};
