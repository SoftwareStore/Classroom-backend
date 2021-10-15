const express = require("express");
const router = express.Router();

const { index, newUser } = require('../../Controllers/User/userController');

router.get('/', index);
router.post('/', newUser);

module.exports=router;