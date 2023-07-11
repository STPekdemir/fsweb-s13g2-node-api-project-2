const router = require("express").Router();
const axios = require("axios");
const { pdTOKEN } = require("../../config/config");
const Customer = require("../mongoDB/mongoDb-model");

const baseUrlPD = "https://api.pipedrive.com/v1";

router.post("/:id", async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    const userObj = {
      phone: customer.phone,
      email: customer.email,
      name: customer.name,
      "102629df1dcf565a81db019a902e63c27d30d6cb": customer.age,
      "0d9a6dc9ed52a47099ae8858e30e85f7c1eb8b49": customer.gender,
      "9f61325d92b0763c3b04c91bffb89bc5d32fb588": customer.firstWorkEnterDate,
      "3096ce3c9a4a9fd775e0f00c43f56c3758f73ace": customer.sector,
      "82aef2db46f2f317535db0c6c0d719a4ffa98343": customer.title,
      "677f00e108be93d8ec71fe07e5f62b5a3b96bc0a": customer.level,
      "852090a09c4cb5140016a7af43962f80db33c86c": customer.university,
      "2be314387d5b12c5a2e8b200001397117f3f61e5": customer.ganoIsOverThree,
      dac23f2049aa5e0f647f0318fee913a1731bbecf: customer.sector,
    };
    const returnPerson = await axios.post(
      `${baseUrlPD}/persons?api_token=${pdTOKEN}`,
      userObj
    );
    console.log("returnPerson", returnPerson);
    const personId = returnPerson.data.data.id;
    const objPD = {
      title: customer.creditType,

      db9bc91fb459b5815879a5ddbacfc7e429b798c0: customer.source,
      e3392fbae2b5cca7195881b36ed63b67a82e2ab5: customer.preference,

      person_id: personId,
    };
    console.log("objpd", objPD);
    let returnLead = await axios.post(
      `${baseUrlPD}/leads?api_token=${pdTOKEN}`,
      objPD
    );

    let updatadetUser = await Customer.findByIdAndUpdate(req.params.id, {
      isSendToPipeDrive: true,
    });
    res.json({ message: "Başarılı" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
