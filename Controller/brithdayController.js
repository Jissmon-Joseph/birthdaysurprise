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

let openedBoxes = [];

// Helper function to get the date part (YYYY-MM-DD) from a Date object in UTC
const getUTCDateString = (date) => {
    return date.toISOString().slice(0, 10);
};

// Helper function to calculate days difference
const getDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return Math.floor(timeDiff / (1000 * 3600 * 24));
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
        // ✨ NEW LOGIC: JULY DATE-BASED OPENING (July 1st = box 1, July 2nd = box 2, etc.) ✨
        // ==========================================================
        
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0-based (June = 5, July = 6)
        const currentDay = currentDate.getDate();
        const currentYear = currentDate.getFullYear();
        
        // Check if we're in July 2025 (month 6 = July)
        if (currentYear !== 2025 || currentMonth !== 6) {
            return res.status(403).json({
                status: false,
                message: `Baby, the boxes are only available in July 2025! 💕`
            });
        }
        
        // Calculate maximum allowed box number based on current date
        // July 1st = box 1, July 2nd = box 2, etc.
        const maxAllowedBoxNumber = currentDay;
        
        console.log(`📅 Current date: July ${currentDay}, 2025`);
        console.log(`📅 Maximum allowed box number: ${maxAllowedBoxNumber}`);
        console.log(`📅 User trying to open box: ${boxNumber}`);
        
        // Check if trying to open a box from the future
        if (boxNumber > maxAllowedBoxNumber) {
            return res.status(403).json({
                status: false,
                message: `Baby..You can't open box ${boxNumber} yet! Today is July ${currentDay}, so you can open up to box ${maxAllowedBoxNumber}. Come back on July ${boxNumber} for that box! 💕`
            });
        }
        
        // Check if trying to open a box beyond July 21st
        if (boxNumber > 21) {
            return res.status(403).json({
                status: false,
                message: `Baby..There are only 21 boxes available! Box ${boxNumber} doesn't exist. 💕`
            });
        }
        
        // Check if the date is beyond July 21st
        if (currentDay > 21) {
            // After July 21st, all boxes should be available
            if (boxNumber > 21) {
                return res.status(403).json({
                    status: false,
                    message: `Baby..There are only 21 boxes available! 💕`
                });
            }
        }
        
        // Allow opening any box up to the current date
        // No restriction on opening previous boxes - they can catch up
        
        // ==========================================================
        // ✨ END OF NEW LOGIC ✨
        // ==========================================================
        
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
        // Sort by box number to maintain order
        openedBoxes.sort((a, b) => a.boxNumber - b.boxNumber);
        
        console.log(`✅ Box ${boxNumber} opened successfully!`);
        console.log(`📊 Total boxes opened: ${openedBoxes.length}/21`);
        
        // Calculate available boxes info
        let availableBoxesInfo = {};
        const currentMaxBox = Math.min(currentDay, 21);
        const unopenedBoxes = [];
        
        for (let i = 1; i <= currentMaxBox; i++) {
            const isOpened = openedBoxes.find(box => box.boxNumber === i);
            if (!isOpened) {
                unopenedBoxes.push(i);
            }
        }
        
        availableBoxesInfo = {
            currentMaxBox,
            unopenedBoxes,
            message: unopenedBoxes.length > 0 ? 
                `You can still open boxes: ${unopenedBoxes.join(', ')}` : 
                `All available boxes for today have been opened!`
        };
        
        // Success response
        return res.status(200).json({
            status: true,
            message: `Box ${boxNumber} opened successfully! 🎉`,
            data: boxData,
            totalOpened: openedBoxes.length,
            remaining: 21 - openedBoxes.length,
            availableBoxes: availableBoxesInfo,
            dateInfo: {
                currentDate: `July ${currentDay}, 2025`,
                maxAvailableBox: currentMaxBox
            }
        });
        
    } catch (error) {
        console.error("❌ Error in opening box:", error);
        return res.status(500).json({
            status: false,
            message: "Internal server error. Please try again later",
        });
    }
};

// Get all opened boxes (bonus endpoint)
const getOpenedBoxes = (req, res) => {
    try {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0-based (July = 6)
        const currentDay = currentDate.getDate();
        const currentYear = currentDate.getFullYear();
        
        // Calculate available boxes info
        let availableBoxInfo = {};
        
        if (currentYear !== 2025 || currentMonth !== 6) {
            availableBoxInfo = {
                message: "Boxes are only available in July 2025! 💕",
                currentDate: currentDate.toDateString()
            };
        } else {
            const maxAllowedBoxNumber = Math.min(currentDay, 21);
            const unopenedBoxes = [];
            
            for (let i = 1; i <= maxAllowedBoxNumber; i++) {
                const isOpened = openedBoxes.find(box => box.boxNumber === i);
                if (!isOpened) {
                    unopenedBoxes.push(i);
                }
            }
            
            availableBoxInfo = {
                currentDate: `July ${currentDay}, 2025`,
                maxAvailableBox: maxAllowedBoxNumber,
                unopenedBoxes,
                message: unopenedBoxes.length > 0 ? 
                    `You can open boxes: ${unopenedBoxes.join(', ')}` : 
                    `All available boxes for today have been opened!`,
                totalAvailableToday: maxAllowedBoxNumber
            };
        }
        
        return res.status(200).json({
            status: true,
            message: "Opened boxes retrieved successfully",
            data: openedBoxes,
            totalOpened: openedBoxes.length,
            remaining: 21 - openedBoxes.length,
            openedBoxNumbers: openedBoxes.map(box => box.boxNumber).sort((a, b) => a - b),
            availableToday: availableBoxInfo
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
                remaining: 21,
                nextAvailable: "Box 1 is now available to open!"
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
};