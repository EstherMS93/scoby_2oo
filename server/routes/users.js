const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const Item = require("./../models/Item")
//const bcrypt = require("bcrypt");
const protectRoute = require("./../middlewares/protectRoute")

/*router.get("/me", function (req, res, next) {
  res.send("respond with a resource");
});*/

//Get route for userpage
router.get('/me', protectRoute, function (req, res, next) {
  User.findById(req.session.currentUser)
  .select("-password") //to avoid updating the password, which will probably require a different route
    .then((currentUser) => {
      res.status(200).json(currentUser);
      console.log(res)
    }).catch((error) => { res.status(500).json(error) })
});

//Get route for user items

router.get('/me/items', protectRoute, function (req, res, next) {
  Item.find({ creator: req.session.currentUser })
    .then((itemsFromDb) => {
      res.status(200).json(itemsFromDb)
      console.log(res)
    }).catch((error) => { res.status(500).json(error) })
});
//Patch route

router.patch('/me', protectRoute, function (req, res, next) {
  if (req.body.password) {
    return res.status(400).json({message : "Password field was sent..."});
  }
  User.findByIdAndUpdate(req.session.currentUser, req.body, {
    new: true,
  }).then((updatedUser) => {
    res.status(200).json(updatedUser)
  }).catch((error) => { console.log(error) })
});

module.exports = router;
