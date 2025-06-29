

const loadEntrancePage = (req, res) => {
    try {
        res.render("entrance")
    } catch (err) {
        console.log("Error in load entrance:", err);
    }
}

const loadGiftBoxPage = (req, res) => {
    try {
        res.render("giftbox");
    } catch (error) {
        console.log("Error in load box page", error);
    }
}


module.exports = {
    loadEntrancePage,
    loadGiftBoxPage
}