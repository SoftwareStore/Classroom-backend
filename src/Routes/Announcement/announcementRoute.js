const express = require("express");
const router = express.Router();

const { index, getAnnouncement, newAnnouncement } = require('../../Controllers/Announcements/announcementController');

router.get('/index',isAuthenticated, index);
router.get('/main',isAuthenticated, getAnnouncement);
router.post('/newAnnouncement',isAuthenticated, newAnnouncement);

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        res.status(400).json({ success: "no Logeado" })
    }
}

module.exports = router;