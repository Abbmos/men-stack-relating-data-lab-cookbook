// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

const index = async (req, res) => {
    try {

        const currentUser = await User.findById(req.params.userId)

        res.render("foods/index.ejs", {
            title: "My Pantry",
            pantry: currentUser.pantry,
        })
    } catch (err) {


        console.log(err);
        res.redirect("/")
    }



}
const newFood = (req, res) => {
    res.render('foods/new.ejs', { title: "Add New Food" })
}
const createFood = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        currentUser.pantry.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }


}
const deleteFood = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        currentUser.pantry.id(req.params.itemId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/foods`)

    } catch (error) {
        console.log(error);
        res.redirect("/")
    }

}
const edit = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId);
        const food = currentUser.pantry.id(req.params.itemId)
        res.render('foods/edit.ejs', {
            title: `Editing ${food.name}`,
            food
        })

    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
}
const update = async (req, res) => {

    try {
        const currentUser = await User.findById(req.params.userId);
        const food = currentUser.pantry.id(req.params.itemId)
        await food.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect("/")
    }
}

module.exports = {
    index,
    newFood,
    createFood,
    deleteFood,
    edit,
    update
};