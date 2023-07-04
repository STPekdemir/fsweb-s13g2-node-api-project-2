const router = require("express").Router();
const Sectors = require("./sectorsSchema");
const {
  SectorExistMW,
  sectorUniqeMW,
  checkSectorAndScoreMW,
} = require("./sectorsMiddleware");
// get all sectors
router.get("/", async (req, res, next) => {
  try {
    const sectors = await Sectors.find();
    res.json(sectors);
  } catch (error) {
    next(error);
  }
});

// get by id
router.get("/:id", SectorExistMW, async (req, res, next) => {
  try {
    res.json(req.sector);
  } catch (error) {
    next(error);
  }
});
// create
router.post(
  "/",
  checkSectorAndScoreMW,
  sectorUniqeMW,
  async (req, res, next) => {
    try {
      const newSector = new Sectors({
        sector: req.body.sector,
        score: req.body.score,
      });
      const createdSector = await newSector.save();

      res.json(createdSector);
    } catch (error) {
      next(error);
    }
  }
);
// update by id
router.put("/:id", SectorExistMW, async (req, res, next) => {
  try {
    if (req.body.sector && req.body.score) {
      const updatedSector = await Sectors.findByIdAndUpdate(
        req.params.id,
        { sector: req.body.sector, score: req.body.score },
        {
          returnDocument: "after",
        }
      );
      res.json(updatedSector);
    } else if (req.body.sector && !req.body.score) {
      const updatedSector = await Sectors.findByIdAndUpdate(
        req.params.id,
        { sector: req.body.sector },
        {
          returnDocument: "after",
        }
      );
      res.json(updatedSector);
    } else if (!req.body.sector && req.body.score) {
      const updatedSector = await Sectors.findByIdAndUpdate(
        req.params.id,
        { score: req.body.score },
        {
          returnDocument: "after",
        }
      );
      res.json(updatedSector);
    } else {
      res.json({ message: "Provide with at least one variable" });
    }
  } catch (error) {
    next(error);
  }
});
// get by sector name

router.get("/name/:sectorName", async (req, res, next) => {
  try {
    const sectorFindedByName = await Sectors.findOne({
      sector: req.params["sectorName"],
    });
    res.json(sectorFindedByName);
  } catch (error) {
    next(error);
  }
});
// delete by id
router.delete("/:id", SectorExistMW, async (req, res, next) => {
  try {
    await Sectors.findByIdAndDelete(req.params.id);
    res.json({ message: "sector deleted" });
  } catch (error) {
    next(error);
  }
});

// create more then one
router.post("/more", async (req, res, next) => {
  try {
    const newSectorArr = req.body.dataArr;
    const createdSector = await Sectors.create(newSectorArr);

    res.json(createdSector);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
