const express = require("express");
const router = express.Router();

const { index, getAnnouncement, newAnnouncement } = require('../../Controllers/Announcements/announcementController');

router.get('/index', index);
router.get('/main', getAnnouncement);
router.post('/newAnnouncement', newAnnouncement);

module.exports = router;