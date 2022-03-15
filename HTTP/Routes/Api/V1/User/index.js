import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../../../../../App/Infrastructure/Database/Models/index.js";

router.get("/login", async (req, res) => {
  
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
