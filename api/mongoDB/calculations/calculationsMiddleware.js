const { typeFormSecret } = require("../../../config/config");
const crypto = require("crypto");
const Sectors = require("../sectors/sectorsSchema");
const Titles = require("../titles/titlesSchema");
const Expception = require("../exceptions/exceptionSchema");
const Constumer = require("../mongoDb-model");

function calculateCreditScore(sectorScore, positionScore, experienceScore) {
  const sectorWeight = 0.5;
  const positionWeight = 0.7;
  const experienceWeight = 0.2;

  const creditScore =
    sectorScore * sectorWeight +
    positionScore * positionWeight -
    experienceScore * experienceWeight;

  return creditScore;
}

function getPreference(creditScore) {
  if (creditScore >= 80) {
    return creditScore >= 90 ? 1 : 2;
  } else if (creditScore >= 60 && creditScore < 80) {
    return creditScore >= 70 ? 3 : 4;
  } else {
    return 5;
  }
}
// typeformdan gelen secretı doğrulama fonksiyonu
const verifySignature = function (receivedSignature, payload) {
  const hash = crypto
    .createHmac("sha256", typeFormSecret)
    .update(payload)
    .digest("base64");
  return receivedSignature === `sha256=${hash}`;
};
// çalıştıramadım
const verifySignatureMiddleware = (req, res, next) => {
  try {
    const signature = req.headers["typeform-signature"];
    const isValid = verifySignature(signature, req.body);
    if (isValid) {
      next();
    } else {
      res.status(400).json({ message: "Secret is false." });
    }
  } catch (error) {
    next(error);
  }
};
//typeformdangelen arrayi objeye çevirir
const arrayToObjMW = async (req, res, next) => {
  try {
    const answers = req.body["form_response"].answers;
    const obj = {};
    await answers.map((answer) => {
      const objKey = answer.field.ref;
      const a = answer.type;
      const objValue = answer[a];
      obj[objKey] = objValue;
      if (a === "choice") {
        obj[objKey] = objValue.label;
      }
      req.typeFormObj = obj;
    });
    next();
  } catch (error) {
    next(error);
  }
};
// sector ve title databasede var ise hesaplamaya gönderir yok ise sonraki 2 middelwareyi geçer
const doesTitleAndSectorExistMW = async (req, res, next) => {
  try {
    const sector = await Sectors.findOne({ sector: req.typeFormObj.sector });

    const title = await Titles.findOne({ title: req.typeFormObj.title });

    if (sector && title) {
      req.sectorScore = sector.score;

      req.titleScore = title.score;

      req.makeCalculationAndLookForExceptions = true;

      next();
    } else {
      req.makeCalculationAndLookForExceptions = false;

      next();
    }
  } catch (error) {
    next(error);
  }
};
// hesaplamayı yapar ve objeye creditScoreu ve preferenceyi kaydeder
const makeCalculationMW = (req, res, next) => {
  try {
    if (req.makeCalculationAndLookForExceptions === false) {
      next();
    } else {
      const creditScore = calculateCreditScore(
        req.sectorScore,
        req.titleScore,
        req.typeFormObj.experience
      );

      const preference = getPreference(creditScore);

      req.typeFormObj.creditScore = creditScore;

      req.typeFormObj.preference = preference;

      next();
    }
  } catch (error) {
    next(error);
  }
};
// istisna olup olmadığına bakar var ise preferenceyi değiştirir ve objeye exception ekleyşp hesaplama yaptığı exception objesini ekler
const lookForExceptionMW = async (req, res, next) => {
  try {
    if (req.makeCalculationAndLookForExceptions === false) {
      next();
    } else {
      const exception = await Expception.findOne({
        sector: req.typeFormObj.sector,
        title: req.typeFormObj.title,
      });
      if (exception) {
        req.typeFormObj.preference = exception.preference;
        req.typeFormObj.exception = exception;
        next();
      } else {
        req.typeFormObj.exception = {};
        console.log(req.typeFormObj);
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

// id ye sahip kullanıcı olup olmadığına bakar
const constumerExist = async (req, res, next) => {
  try {
    const constemer = await Constumer.findById(req.params.id);
    if (!constemer) {
      res.status(404).json({ message: "Kayıt bulunmamaktadır" });
    } else {
      req.typeFormObj = constemer;

      //
      next();
    }
  } catch (error) {
    next(error);
  }
};
/*const calculateMany = async (req, res, next) => {
  try {
    let data = req.body.data;

    const promises = data.map(async (item) => {
      const sectorScore = await Sectors.findOne({
        sector: item.sector,
      });
      const titleScore = await Titles.findOne({ title: item.title });

      const creditScore = calculateCreditScore(
        sectorScore.score,
        titleScore.score,
        item.experience
      );
      const preference = getPreference(creditScore);
      item.creditScore = creditScore;
      item.preference = preference;

      return item;
    });

    data = await Promise.all(promises);

    req.body.data = data;

    next();
  } catch (error) {
    next(error);
  }
};*/

module.exports = {
  verifySignatureMiddleware,
  arrayToObjMW,
  makeCalculationMW,
  lookForExceptionMW,
  doesTitleAndSectorExistMW,
  constumerExist,
  //calculateMany,
};
