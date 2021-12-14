const hs = require("http-status");

const index = () => {
  console.log("User Index");
  new User({
    first_name: "Furkan",
    last_name: "Türkoğlu",
    email: "furkan@test.com",
    password: "123456789",
  })
    .save()
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
};
