

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
};


// let openedBoxes = [];

// // Helper function to get the date part (YYYY-MM-DD) from a Date object in UTC
// const getUTCDateString = (date) => {
//     return date.toISOString().slice(0, 10);
// };


// New code--------------------------------

    let openedBoxes = [];

    // Helper function to get the date part (YYYY-MM-DD) from a Date object in UTC
    const getUTCDateString = (date) => {
        return date.toISOString().slice(0, 10);
    };

    const boxOpen = (req, res) => {
        try {
            // Extract data from request body
            const { boxNumber, openDate, timestamp, isOpen } = req.body;
            
            console.log("Data received from frontend:", req.body);
            
            // --- Basic Validation ---
            if (!boxNumber || !openDate || !timestamp || isOpen === undefined) {
                return res.status(400).json({ status: false, message: "Missing required fields." });
            }
            if (boxNumber < 1 || boxNumber > 21) {
                return res.status(400).json({ status: false, message: "Invalid box number." });
            }
            const currentTimestamp = Date.now();
            if (Math.abs(currentTimestamp - timestamp) > 10 * 60 * 1000) {
                return res.status(401).json({ status: false, message: "Request is too old. Please refresh." });
            }
            
            // --- Check if this specific box was already opened ---
            const alreadyOpened = openedBoxes.find(box => box.boxNumber === boxNumber);
            if (alreadyOpened) {
                return res.status(200).json({
                    status: true,
                    message: `Box ${boxNumber} was already opened on ${new Date(alreadyOpened.openedAt).toLocaleDateString()}`,
                    data: alreadyOpened
                });
            }
            
            // ==========================================================
            // ✨ NEW LOGIC: ASCENDING ORDER RULE (1, 2, 3, 4...) ✨
            // ==========================================================
            
            // The next box number that should be opened is the current count + 1
            const expectedBoxNumber = openedBoxes.length + 1;
            
            // If the user tries to open a box that is not the next in sequence
            if (boxNumber !== expectedBoxNumber) {
                console.log(`🚫 Blocked: User tried to open box ${boxNumber}, but box ${expectedBoxNumber} is next.`);
                // 403 Forbidden is a good status code for a rule violation
                return res.status(403).json({
                    status: false,
                    message: `Whoops! You need to open the boxes in order. Please open box ${expectedBoxNumber} first. ✨`
                });
            }
            // ==========================================================
            // ✨ END OF NEW LOGIC ✨
            // ==========================================================
            
            
            // --- (Optional) Keep the "One Box Per Day" Rule ---
            // If you want BOTH rules (ascending order AND only one per day),
            // you can keep this block. If not, you can remove it.
            if (openedBoxes.length > 0) {
                const lastOpenedBox = openedBoxes[openedBoxes.length - 1];
                const lastOpenedDate = getUTCDateString(new Date(lastOpenedBox.openedAt));
                const todayDate = getUTCDateString(new Date());

                // if (lastOpenedDate === todayDate) {
                //     console.log(`🚫 Blocked: A box was already opened today (${lastOpenedDate}).`);
                //     return res.status(429).json({
                //         status: false,
                //         message: "You've already opened a surprise today! Please come back tomorrow for the next one. 💕",
                //     });
                // }
            }
            
            // If all checks pass, create the new box data
            const boxData = {
                boxNumber,
                openedAt: new Date().toISOString(),
                originalOpenDate: openDate,
                timestamp,
                isOpen: true
            };
            
            // Save to our in-memory array
            openedBoxes.push(boxData);
            // The array will naturally be in order now, but sorting doesn't hurt
            openedBoxes.sort((a, b) => a.boxNumber - b.boxNumber);
            
            console.log(`✅ Box ${boxNumber} opened successfully!`);
            console.log(`📊 Total boxes opened: ${openedBoxes.length}/21`);
            
            // Success response
            return res.status(200).json({
                status: true,
                message: `Box ${boxNumber} opened successfully! 🎉`,
                data: boxData,
                totalOpened: openedBoxes.length,
                remaining: 21 - openedBoxes.length
            });
            
        } catch (error) {
            console.error("❌ Error in opening box:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error. Please try again later",
            });
        }
    };

// End---------------------------------

    // Get all opened boxes (bonus endpoint)
    const getOpenedBoxes = (req, res) => {
        try {
            return res.status(200).json({
                status: true,
                message: "Opened boxes retrieved successfully",
                data: openedBoxes,
                totalOpened: openedBoxes.length,
                remaining: 21 - openedBoxes.length,
                openedBoxNumbers: openedBoxes.map(box => box.boxNumber).sort((a, b) => a - b)
            });
        } catch (error) {
            console.error("❌ Error getting opened boxes:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
            });
        }
    };

    // Reset all opened boxes (for testing)
    const resetBoxes = (req, res) => {
        try {
            openedBoxes = [];
            console.log("🔄 All boxes have been reset");
            
            return res.status(200).json({
                status: true,
                message: "All boxes have been reset successfully",
                data: {
                    totalOpened: 0,
                    remaining: 21
                }
            });
        } catch (error) {
            console.error("❌ Error resetting boxes:", error);
            return res.status(500).json({
                status: false,
                message: "Internal server error",
            });
        }
    };




module.exports = {
    loadEntrancePage,
    loadGiftBoxPage,
    boxOpen,
    getOpenedBoxes,
    resetBoxes
}