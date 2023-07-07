const router = require("express").Router();
const Costemers = require("../mongoDb-model");

router.get("/pie", async (req, res, next) => {
  try {
    let customers = await Costemers.find().select({ creditScore: 1, _id: 0 });
    let obj = {};

    customers.map((item) => {
      if (typeof item.creditScore === "number") {
        let floor = Math.floor(item.creditScore);
        if (obj.hasOwnProperty(floor)) {
          obj[floor] = obj[floor] + 1;
        } else {
          obj[floor] = 1;
        }
      }
    });

    res.json(obj);
  } catch (error) {
    next(error);
  }
});
router.get("/pieRef", async (req, res, next) => {
  try {
    let customers = await Costemers.find().select({ source: 1, _id: 0 });
    let obj = {};
    customers.map((item) => {
      if (obj.hasOwnProperty(item.source)) {
        obj[item.source] = obj[item.source] + 1;
      } else {
        obj[item.source] = +1;
      }
    });
    res.status(200).json(obj);
  } catch (error) {
    next(error);
  }
});
//calculationsa middleware olarak ekle
// her biri için ayrı schema yarat databasede tut

router.get("/countOfPeople", async (req, res, next) => {
  try {
    const customers = await Costemers.find().select({ createdAt: 1, _id: 0 });
    const obj = {};
    customers.map((item) => {
      const date = new Date(item.createdAt);
      let day = date.getDay();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();
      let fullDate = [day, month, year].join(".");
      if (obj.hasOwnProperty(fullDate)) {
        obj[fullDate] = obj[fullDate] + 1;
      } else {
        obj[fullDate] = 1;
      }
    });
    res.status(200).json(obj);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
