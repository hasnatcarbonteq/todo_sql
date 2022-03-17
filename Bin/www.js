import app from "../HTTP/Bootstrap/app.js";
import {server} from "../App/Infrastructure/Config/index.js";
import DB from "../App/Infrastructure/Database/Models/index.js";

(async () => {
  try {
    await DB.sequelize.authenticate();
    await DB.sequelize.sync();
    app.listen(server.PORT, () => {
      console.log(`Server is running on port ${server.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();