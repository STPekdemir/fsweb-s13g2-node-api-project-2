const router = require("express").Router();
const Constumer = require("./mongoDb-model");

// Getting all
router.get("/", async (req, res) => {
  try {
    const constumers = await Constumer.find();
    res.json(constumers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get("/:id", async (req, res, next) => {
  try {
    const customer = await Constumer.findById(req.params.id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
});

// Creating one
router.post("/", async (req, res) => {
  const subscriber = new Constumer({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    phone: req.body.phone,
    email: req.body.email,
    university: req.body.university,
    level: req.body.level,
    ganoIsOverThree: req.body.ganoIsOverThree,
    firstWorkEnterDate: req.body.firstWorkEnterDate,
    sector: req.body.sector,
    title: req.body.title,
    experience: req.body.experience,
    salary: req.body.salary,
    creditType: req.body.creditType,
    isOkay: req.body.isOkay,
    source: req.body.source,
    creditScore: req.body.creditScore,
    preference: req.body.preference,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // Deleting One
router.delete("/:id", getConstumer, async (req, res) => {
  try {
    //const res =await
    await Constumer.deleteOne(req.constumer);
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getConstumer(req, res, next) {
  try {
    let constumer;
    constumer = await Constumer.findById(req.params.id);
    if (constumer == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    } else {
      res.constumer = constumer;
      next();
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
