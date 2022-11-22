require("dotenv").config();
export default {
  port: process.env.API_PORT,
  dbUri: process.env.DB_URI,
  saltWorkFactor: process.env.SALT_WORK_FACTOR,
};
