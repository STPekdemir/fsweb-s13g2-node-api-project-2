const router = require("express").Router();
const {
  exceptionExistMW,
  exceptionUniqeMW,
  checkCredentialsMW,
} = require("./exceptionMiddelware");
const Exceptions = require("./exceptionSchema");
// get all exceptions
router.get("/", async (req, res, next) => {
  try {
    const exceptions = await Exceptions.find();
    res.json(exceptions);
  } catch (error) {
    next(error);
  }
});
// get by id
router.get("/:id", exceptionExistMW, (req, res, next) => {
  try {
    res.json(req.exception);
  } catch (error) {
    next(error);
  }
});
//create
router.post(
  "/",
  checkCredentialsMW,
  exceptionUniqeMW,
  async (req, res, next) => {
    try {
      const newException = new Exceptions({
        sector: req.body.sector,
        title: req.body.title,
        preference: req.body.preference,
      });
      const createdExpception = await newException.save();

      res.json(createdExpception);
    } catch (error) {
      next(error);
    }
  }
);
// update by id
router.put("/:id", exceptionExistMW, async (req, res, next) => {
  try {
    const updatedException = await Exceptions.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        sector: req.body.sector,
        prefrence: req.body.preference,
      },
      {
        returnDocument: "after",
      }
    );
    res.json(updatedException);
  } catch (error) {
    next(error);
  }
});
// delete by id
router.delete("/:id", exceptionExistMW, async (req, res, next) => {
  try {
    await Exceptions.findByIdAndDelete(req.params.id);
    res.json({ message: "Exception deleted" });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
