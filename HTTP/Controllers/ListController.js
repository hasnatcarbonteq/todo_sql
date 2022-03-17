import DB from "../../App/Infrastructure/Database/Models/index.js";
import ListService from "../../App/Infrastructure/Service/ListService.js";

class ListController {
  static FetchAll = async (req, res) => {
    try {
      const data = await ListService.GetAll();
      const { todos } = data.data;
      return res.status(200).json({
        status: 200,
        data: {
          todos,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  static Create = async (req, res) => {
    try {
      const data = await ListService.Create(req.body);
      const { todo, message } = data.data;
      return res.status(200).json({
        status: 200,
        data: {
          message,
          todo,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  static FetchById = async (req, res) => {
    try {
      const todo = await DB.Todo.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.send(todo);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  };

  static Delete = async (req, res) => {
    try {
      await DB.Todo.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send("Successfully deleted");
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  };

  static Update = async (req, res) => {
    try {
      await DB.Todo.update(
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
  };
}

export default ListController;
