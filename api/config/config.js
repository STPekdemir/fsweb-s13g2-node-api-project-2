const dotenv = require("dotenv").config();
module.exports = {
  //PORT: process.env.PORT || 3000,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV || "development",
  //TYPEFORM_TOKEN: process.env.NODE_ENV,
  pdTOKEN: process.env.PIPEDRIVE_TOKEN,
  mongoString: process.env.DATABASE_URL,
  typeFormSecret: process.env.TYPEFORM_SECRET,
};
