import express from 'express';
const router = express.Router();
import db from "../../../../../App/Infrastructure/Database/Models/index.js"


router.get("/fetch", async (req, res) => {
  try {
    const todos = await db.Todo.findAll();
    res.send(todos);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/create", async (req, res) => {
  try {
    const todo = await db.Todo.create({
      text: req.body.text,
    });
    res.send(todo);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/fetch/:id", async (req, res) => {
  try {
    const todo = await db.Todo.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.send(todo);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await db.Todo.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Successfully deleted");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    await db.Todo.update(
      {
        text: req.body.text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send("Updated!");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

export default router;