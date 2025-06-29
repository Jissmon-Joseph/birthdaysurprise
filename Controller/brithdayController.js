

const loadEntrancePage = (req, res) => {
    try {
        res.render("entrance")
    } catch (err) {
        console.log("Error in load entrance:", err);
    }
}


module.exports = {
    loadEntrancePage,
}