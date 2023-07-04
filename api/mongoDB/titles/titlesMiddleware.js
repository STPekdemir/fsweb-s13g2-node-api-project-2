const Titles = require("./titlesSchema");
// check if the id title exist (getByİd,deletByid,updateİd)
const titleExistMW = async (req, res, next) => {
  try {
    const title = await Titles.findById(req.params.id);
    if (title) {
      req.title = title;
      next();
    } else {
      res.status(404).json({ message: "Title does not exist." });
    }
  } catch (error) {
    next(error);
  }
};
// check if the title uniqe (create,update)
const titleUniqeMW = async (req, res, next) => {
  try {
    const isTitleUniqe = await Titles.findOne({ title: req.body.title });
    if (isTitleUniqe) {
      res.status(403).json({ message: "Title should be uniqe." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
// check body for title and score
const checkTitleAndScoreMW = (req, res, next) => {
  try {
    const { title, score } = req.body;
    if (title && score) {
      next();
    } else {
      res.status(404).json({ message: "Provide all credentials." });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  titleExistMW,
  titleUniqeMW,
  checkTitleAndScoreMW,
};
