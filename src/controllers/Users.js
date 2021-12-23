const hs = require("http-status");
const uuid = require("uuid");
const { list, insert, findOne, findOneAndUpdate } = require("../services/Users");
const { passwordToHash, generateJWTAccessToken, generateJWTRefreshToken } = require("../scripts/utils/helper");
const eventEmitter = require("../scripts/events/eventEmitter");
const UserService = require("../services/UserService");

class UserController {
  index(req, res) {
    UserService.list()
      .then((userList) => {
        if (!userList) res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var..." });
        res.status(hs.OK).send(userList);
      })
      .catch((err) => res.status(ha.INTERNAL_SERVER_ERROR).send(err));
  }

  create(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.create(req.body)
      .then((createdUser) => {
        if (!createdUser) res.status(hs.INTERNAL_SERVER_ERROR).send({ error: "Sorun var..." });
        res.status(hs.OK).send(createdUser);
      })
      .catch((err) => res.status(hs.INTERNAL_SERVER_ERROR).send(err));
  }

  login(req, res) {
    req.body.password = passwordToHash(req.body.password);
    UserService.findOne(req.body)
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
  }

  resetPassword(req, res) {
    //findOneAndUpdate de kullanılabilir
    const newPassword = uuid.v4()?.split("-")[0] || `nw-usr-${new Date().getTime()}`;
    console.log("newPassword :>> ", newPassword);

    UserService.updateWhere({ email: req.body.email }, { password: passwordToHash(newPassword) }).then((fetchedUser) => {
      if (!fetchedUser) return res.status(hs.NOT_FOUND).send({ message: "User not found" });

      //send data
      eventEmitter.emit("send_email", {
        to: req.body.email, // list of receivers
        subject: "Reset Password", // Subject line
        html: `<b>Your new password is: ${newPassword}</b>`, // html body
      });
      res.status(200).send({
        message: "Your new password sent to your email",
      });
    });
  }
}

module.exports = new UserController();
