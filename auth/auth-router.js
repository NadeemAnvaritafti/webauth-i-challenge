const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();

const Users = require("../users/users-model");


router.post('/register', (req, res) => {
    const userData = req.body;
    
});


router.post('/login', (req, res) => {

});




module.exports = router;