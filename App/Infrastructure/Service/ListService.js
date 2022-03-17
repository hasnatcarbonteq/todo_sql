import DB from "../Database/Models/index.js";

class ListService {
  static GetAll = async () => {
    try {
      const todos = await DB.Todo.findAll();
      return {
        status: 200,
        data: {
          todos,
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

  static Create = async (data) => {
    try {
      const todo = await DB.Todo.create({
        text: data.text,
      });
      return {
        status: 200,
        data: {
          message: "Successfully created",
          todo,
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

export default ListService;
