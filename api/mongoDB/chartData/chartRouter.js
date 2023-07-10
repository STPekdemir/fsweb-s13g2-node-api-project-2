const router = require("express").Router();
const Costemers = require("../mongoDb-model");
// credi scoru dağılımını döner
router.get("/pie", async (req, res, next) => {
  try {
    let customers = await Costemers.find().select({ creditScore: 1, _id: 0 });
    let obj = {};

    customers.map((item) => {
      if (typeof item.creditScore === "number") {
        let floor = Math.floor(item.creditScore / 10) * 10;
        const range = `${floor}-${floor + 9}`;
        if (obj.hasOwnProperty(range)) {
          obj[range]++;
        } else {
          obj[range] = 1;
        }
      }
    });

    res.status(200).json(obj);
  } catch (error) {
    next(error);
  }
});
// return how many people come from source x
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
// hangi tarihte kaç kişi gelmiş onu döner

router.get("/countOfPeople", async (req, res, next) => {
  try {
    const customers = await Costemers.find().select({ created_at: 1, _id: 0 });
    const obj = {};
    customers.map((item) => {
      const date = new Date(item.created_at);
      console.log(item);
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
// hangi tercih sırasında kaç kişi var onu döner
router.get("/pref", async (req, res, next) => {
  try {
    let data = await Costemers.find();
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      if (obj.hasOwnProperty(data[i].preference)) {
        obj[data[i].preference] = obj[data[i].preference] + 1;
      } else {
        obj[data[i].preference] = 1;
      }
    }
    res.status(200).json(obj);
  } catch (error) {
    next(error);
  }
});
// hangi sectorde kaç kişi olduğunu döner
router.get("/sector", async (req, res, next) => {
  try {
    let data = await Costemers.find();
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      if (obj.hasOwnProperty(data[i].sector)) {
        obj[data[i].sector] = obj[data[i].sector] + 1;
      } else {
        obj[data[i].sector] = 1;
      }
    }
    res.status(200).json(obj);
  } catch (error) {
    next(error);
  }
});
// bir istisnaya uyan kaç kişi olduğunu döner
router.get("/exc", async (req, res, next) => {
  try {
    let data = await Costemers.find({ exception: { $ne: { none: "none" } } });
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      if (obj.hasOwnProperty(`${data[i].sector}_${data[i].title}`)) {
        obj[`${data[i].sector}_${data[i].title}`] =
          obj[`${data[i].sector}_${data[i].title}`] + 1;
      } else {
        obj[`${data[i].sector}_${data[i].title}`] = 1;
      }
    }
    res.status(200).json(obj);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
