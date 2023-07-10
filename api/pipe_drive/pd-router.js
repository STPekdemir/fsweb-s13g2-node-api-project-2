const router = require("express").Router();
const axios = require("axios");
const { pdTOKEN, PORT } = require("../../config/config");
const Customer = require("../mongoDB/mongoDb-model");

const baseUrlPD = "https://api.pipedrive.com/v1/leads";

router.post("/:id", async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    const string = customer.preference.toString();
    const string2 = customer.salary.toString();
    const string3 = customer.sector.toString();
    const string4 = customer.experience.toString();
    const objPD = {};
    objPD.person_id = 9;
    const string5 = customer.creditScore.toString();
    objPD.title = "tolga";
    objPD["c1c15ee86d534c55724b7bc6a1f12a6d69c74fda"] = string2;
    objPD["1c52c46705707674e5262d93c51a1de67af016c9"] = string;
    objPD["2ce4cc0e7f87a95fc6313c18064515079689c7d2"] = string5;
    objPD["11f443aedfc768919b93b9128390d9c6c9602fb7"] = string3;
    objPD["d05169409c79c17505af97ce34df89916889a7e4"] = string4;
    // maas c1c15ee86d534c55724b7bc6a1f12a6d69c74fda +
    // prefenrece  1c52c46705707674e5262d93c51a1de67af016c9 +
    // creditScore 2ce4cc0e7f87a95fc6313c18064515079689c7d2
    // sektor 11f443aedfc768919b93b9128390d9c6c9602fb7
    // tecrube d05169409c79c17505af97ce34df89916889a7e4
    let dataAx = await axios
      .post(baseUrlPD + `?api_token=${pdTOKEN}`, objPD)
      .then((res) => {
        console.log(res);

        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    res.json(dataAx);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;

/*interface abstract class 
value type reference type
SOLID prensipleri
field , property
OOP ilkeleri

ASP.NET
*/
