//
const Exceptions = require("./exceptionSchema");
//check if id exception exist
const exceptionExistMW = async (req, res, next) => {
  try {
    const exception = await Exceptions.findById(req.params.id);
    if (exception) {
      req.exception = exception;
      next();
    } else {
      res.status(403).json({ message: "Exception does not exist." });
    }
  } catch (error) {
    next(error);
  }
};
// check if the exception uniqe
const exceptionUniqeMW = async (req, res, next) => {
  try {
    const isExceptionUniqe = await Exceptions.findOne({
      sector: req.body.sector,
      title: req.body.title,
    });
    if (isExceptionUniqe) {
      res.status(403).json({ message: "Exception should be uniqe." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
// check body for title,preference,sector
const checkCredentialsMW = (req, res, next) => {
  try {
    const { sector, title, preference } = req.body;
    if (sector && title && preference) {
      next();
    } else {
      res.status(404).json({ message: "Provide all credentials." });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  exceptionExistMW,
  exceptionUniqeMW,
  checkCredentialsMW,
};
