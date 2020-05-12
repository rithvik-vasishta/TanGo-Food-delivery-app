const express = require('express');
const bcrypt = require('bcrypt');
const userController = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');

const router = express.Router();
router.post('/register',asyncHandler(insert));
router.post('/login',asyncHandler(getUserByEmailIdAndPassword));

async function insert(req,res,next){
    const user = req.body;
    console.log('regestering the user', user);
    const savedUser =  await userController.insert(user);
    res.json(savedUser);
}

async function getUserByEmailIdAndPassword(req, res, next){
    const user = req.body;
    console.log(`searching user for `, user);

    const savedUser = await userController.getUserByEmailIdAndPassword(user.email,user.password);

    res.json(savedUser);
}


module.exports = router;