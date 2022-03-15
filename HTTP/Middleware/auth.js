import jwt from "jsonwebtoken";
import db from "../../App/Infrastructure/Database/Models/index.js";

const Auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return;
    }

    const decode = await jwt.verify(token, "secret");
    const user = await db.User.findByUserId(decode.id);

    if (!user) {
      return;
    }

    req.userInfo = user;
    return next();
  } catch (err) {
      return err;
  }
};

export default Auth;