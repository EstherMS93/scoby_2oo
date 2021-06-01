const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Item = require("./../models/Item")
const bcrypt = require("bcrypt");
const protectRoute = require ("./../middlewares/protectRoute")

router.get("/me", function (req, res, next) {
  res.send("respond with a resource");
});

//Get route for userpage
router.get('/me', protectRoute, function(req, res, next) {
  User.find({user: req.session.currentUser._id})
  .then((res) => {
    console.log(res)
  }).catch ((error) => {console.log(error)})
});

//Get route for user items

router.get('/me/items', protectRoute, function(req, res, next) {
  Item.find({creator: req.params.id})
  .then((res) => {
    console.log(res)
  }).catch ((error) => {console.log(error)})
});


module.exports = router;
