import express from "express";
const router = express.Router();
import UserController from "../../../../Controllers/UserController.js";

router.post("/login", UserController.Login);

router.post("/register", UserController.Register);

export default router;
