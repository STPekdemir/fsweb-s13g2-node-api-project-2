const router = require("express").Router();
const Costemers = require("../mongoDb-model");

router.get("/pie", async (req, res, next) => {
  try {
    let customers = await Costemers.find().select({ creditScore: 1, _id: 0 });
    let obj = {};
    customers.map((item) => {
      if (obj.hasOwnProperty(item.creditScore)) {
        obj[item.creditScore] = obj[item.creditScore] + 1;
      } else {
        obj[item.creditScore] = 1;
      }
    });
    res.json(obj);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
