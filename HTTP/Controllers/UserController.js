import UserService from "../../App/Infrastructure/Service/UserService.js";
class UserController {
  static Login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const data = await UserService.Login(email, password);
      const { token, user } = data.data;
      return res.status(200).json({
        status: 200,
        data: {
          message: "Auth successful",
          token,
          user: {
            id: user.id,
            email: user.email,
            username: user.username
          }
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };

  static Register = async (req, res) => {
    try {
      const { email, password, username } = req.body;
      // validate
      const data = await UserService.Register(email, password, username);
      return res.status(200).json({
        status: 200,
        data: {
          message: "User created successfully",
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
}

export default UserController;
