const express = require("express");
const router = express.Router();
const birthdatController = require("../Controller/brithdayController");


router.get("/", birthdatController.loadEntrancePage);

router.get("/giftbox", birthdatController.loadGiftBoxPage);

router.post("/box-opened", birthdatController.boxOpen);

// router.get('/opened-boxes', birthdatController.getOpenedBoxes);

router.post('/reset-boxes', birthdatController.resetBoxes);

// Individual surprise page routes
router.get('/surprise/1', (req, res) => {
    res.render('surprise1', { boxNumber: 1 });
});

router.get('/surprise/2', (req, res) => {
    res.render('surprise2', { boxNumber: 2 });
});

router.get('/surprise/3', (req, res) => {
    res.render('surprise3', { boxNumber: 3 });
});

router.get('/surprise/4', (req, res) => {
    res.render('surprise4', { boxNumber: 4 });
});

router.get('/surprise/5', (req, res) => {
    res.render('surprise5', { boxNumber: 5 });
});

router.get('/surprise/6', (req, res) => {
    res.render('surprise6', { boxNumber: 6 });
});

router.get('/surprise/7', (req, res) => {
    res.render('surprise7', { boxNumber: 7 });
});

router.get('/surprise/8', (req, res) => {
    res.render('surprise8', { boxNumber: 8 });
});

router.get('/surprise/9', (req, res) => {
    res.render('surprise9', { boxNumber: 9 });
});

router.get('/surprise/10', (req, res) => {
    res.render('surprise10', { boxNumber: 10 });
});

router.get('/surprise/11', (req, res) => {
    res.render('surprise11', { boxNumber: 11 });
});

router.get('/surprise/12', (req, res) => {
    res.render('surprise12', { boxNumber: 12 });
});

router.get('/surprise/13', (req, res) => {
    res.render('surprise13', { boxNumber: 13 });
});

router.get('/surprise/14', (req, res) => {
    res.render('surprise14', { boxNumber: 14 });
});

router.get('/surprise/15', (req, res) => {
    res.render('surprise15', { boxNumber: 15 });
});

router.get('/surprise/16', (req, res) => {
    res.render('surprise16', { boxNumber: 16 });
});

router.get('/surprise/17', (req, res) => {
    res.render('surprise17', { boxNumber: 17 });
});

router.get('/surprise/18', (req, res) => {
    res.render('surprise18', { boxNumber: 18 });
});

router.get('/surprise/19', (req, res) => {
    res.render('surprise19', { boxNumber: 19 });
});

router.get('/surprise/20', (req, res) => {
    res.render('surprise20', { boxNumber: 20 });
});

router.get('/surprise/21', (req, res) => {
    res.render('surprise21', { boxNumber: 21 });
});




module.exports = router;