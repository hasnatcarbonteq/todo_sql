import DB from "../Database/Models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { server } from "../Config/index.js";

class UserService {
  static Login = async (email, password) => {
    try {
      const user = await DB.User.scope("withPassword").findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return {
          message: "Auth failed",
          status: 401,
        };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return {
          message: "Auth failed",
          status: 401,
        };
      }
      const token = jwt.sign({ id: user.id }, server.SECRET, {
        expiresIn: server.TOKEN_EXPIRATION_TIME,
      });
      return {
        staus: 200,
        data: {
          message: "Auth successful",
          token,
          user,
        },
      };
    } catch (err) {
      throw {
        status: 500,
        data: {
          message: err.message,
        },
      };
    }
  };

  static Register = async (email, password, username) => {
    try {
      // validate
      const user = await DB.User.findOne({ where: { email } });
      // res.send(user);
      if (user) {
        throw `Email ${email} is already taken`;
      }
      let hashedPassword = null;
      // hash password
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // save user
      await DB.User.create({
        email,
        password: hashedPassword,
        username,
      });
      return {
        status: 200,
        data: {
          message: "Successfully registered",
        },
      };
    } catch (err) {
      throw {
        status: 500,
        data: {
          message: err.message,
        },
      };
    }
  };
}

export default UserService;
