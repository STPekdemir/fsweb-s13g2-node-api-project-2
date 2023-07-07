const router = require("express").Router();
const Costemers = require("../mongoDb-model");

router.get("/pie", async (req, res, next) => {
  try {
    let customers = await Costemers.find().select("creditScore -_id");
    let obj = {};
    let data = customers.map((item) => {
      if (obj.hasOwnProperty(item.creditScore)) {
        obj[item.creditScore] = obj[item.creditScore] + 1;
      } else {
        obj[item.creditScore] = 1;
      }
    });
    res.status(200).json(obj);
  } catch (error) {
    next(error);
  }
});
