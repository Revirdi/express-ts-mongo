import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

function connect() {
  const dbUri = config.get<string>("dbUri");
  console.log(dbUri);
  return mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("Connected to DB");
    })
    .catch((err) => {
      logger.error("Could not connect to db");
      process.exit(1);
    });
}
export default connect;
