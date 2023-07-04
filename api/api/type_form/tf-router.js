const router = require("express").Router();
const axios = require("axios");
const { pdTOKEN, PORT } = require("../../config/config");

const baseUrlPD = "https://api.pipedrive.com/v1/leads";

router.post("/", async (req, res, next) => {
  try {
    let dataAx = await axios
      .post(baseUrlPD + `?api_token=${pdTOKEN}`, {
        title: "VSCODE DEneme",
        person_id: 9,
      })
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
