const express = require("express");
const router = express.Router();
const birthdatController = require("../Controller/brithdayController");


router.get("/", birthdatController.loadEntrancePage);
router.get("/giftbox", birthdatController.loadGiftBoxPage);




module.exports = router;