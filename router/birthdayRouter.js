const express = require("express");
const router = express.Router();
const birthdatController = require("../Controller/brithdayController");


router.get("/", birthdatController.loadEntrancePage);




module.exports = router;