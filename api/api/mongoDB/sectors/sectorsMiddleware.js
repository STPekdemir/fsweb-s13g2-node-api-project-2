const Sectors = require("./sectorsSchema");
// check if the id title exist (getByİd,deletByid,updateİd)
const SectorExistMW = async (req, res, next) => {
  try {
    const sector = await Sectors.findById(req.params.id);
    if (sector) {
      req.sector = title;
      next();
    } else {
      res.status(404).json({ message: "Sector does not exist." });
    }
  } catch (error) {
    next(error);
  }
};
// check if the sector uniqe (create,update)
const sectorUniqeMW = async (req, res, next) => {
  try {
    const isSectorUniqe = await Sectors.findOne({ sector: req.body.sector });
    if (isSectorUniqe) {
      res.status(403).json({ message: "Sector should be uniqe." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
// check body for title and score
const checkSectorAndScoreMW = (req, res, next) => {
  try {
    const { sector, score } = req.body;
    if (sector && score) {
      next();
    } else {
      res.status(404).json({ message: "Provide all credentials." });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  SectorExistMW,
  sectorUniqeMW,

  checkSectorAndScoreMW,
};
