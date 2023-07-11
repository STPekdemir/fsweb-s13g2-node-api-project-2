const dotenv = require("dotenv").config();
module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV || "development",

  pdTOKEN: process.env.PIPEDRIVE_TOKEN,
  mongoString: process.env.DATABASE_URL,
  typeFormSecret: process.env.TYPEFORM_SECRET,
};
