import app from "../HTTP/Bootstrap/app.js";
import {server} from "../App/Infrastructure/Config/index.js";
import db from "../App/Infrastructure/Database/Models/index.js";

(async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    app.listen(server.PORT, () => {
      console.log(`Server is running on port ${server.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();