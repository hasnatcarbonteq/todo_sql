import jwt from "jsonwebtoken";
import db from "../../App/Infrastructure/Database/Models/index.js";

const Auth = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];
    if (!token) {
      return;
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await db.User.findOne({where: {id: decode.id}});
    if (!user) {
      return;
    }

    return next();
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
};

export default Auth;
