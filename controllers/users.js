// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

const index = async (req, res) => {
    try {

        const users = await User.find()

        res.render("users/index.ejs", {
            title: "Our Commnunity!",
            users
        })
    } catch (err) {


        console.log(err);
        res.redirect("/")
    }
}

const show = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const pantry = currentUser.pantry

        res.render("users/show.ejs", {
            title: `${currentUser.username}'s Pantry`,
            user: currentUser,
            pantry
        })
    } catch (err) {


        console.log(err);
        res.redirect("/")
    }
}


module.exports = {
    index,
    show

};