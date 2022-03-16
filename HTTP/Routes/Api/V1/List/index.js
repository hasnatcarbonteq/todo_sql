import express from "express";
const router = express.Router();
import Auth from "../../../../Middleware/Auth.js";
import ListController from "../../../../Controllers/ListController.js";

router.get("/fetch", Auth, ListController.FetchAll);

router.post("/create", Auth, ListController.Create);

router.get("/fetch/:id", Auth, ListController.FetchById);

router.delete("/delete/:id", Auth, ListController.Delete);

router.put("/update/:id", Auth, ListController.Update);

export default router;
