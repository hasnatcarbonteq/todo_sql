import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../../../../../App/Infrastructure/Database/Models/index.js";
import {server} from "../../../../../App/Infrastructure/Config/index.js";

router.post("/login", async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await db.User.scope('withPassword').findOne({
      where: {
        email
      }
    });
    if (!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {
      expiresIn: "12h"
    });
    res.status(200).json({
      message: "Auth successful",
      token
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
  
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    // validate
    const user = await db.User.findOne({ where: { email } })
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
    await db.User.create({
      email,
      password: hashedPassword,
      username
    });
    return res.send("Successfully registered");

  } catch (error) {
    console.log(error);
  }
});

export default router;
