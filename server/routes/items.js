const express = require("express");
const router = express.Router();
const ItemModel = require("./../models/Item");

//Get route

router.get("/", (req, res, next) => {
  ItemModel.find()
    .then((itemsFromDb) => {
      res.status(200).json(itemsFromDb)
    })
    .catch((error) => {
      res.status(500).json(error)
    });
});

//Get by id
router.get("/:id", (req, res, next) => {
  ItemModel.findById(req.params.id)
    .then((itemsFromDb) => {
      res.status(200).json(itemsFromDb)
    })
    .catch((error) => {
      res.status(500).json(error)
    });
});

// Post route

router.post("/", (req, res, next) => {
  const newItem = { ...req.body };



  ItemModel.create(newItem)
    .then((itemsFromDb) => {
      res.status(201).json(itemsFromDb);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//Patch route

router.patch("/:id", (req, res, next) => {
  ItemModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((itemsFromDb) => {
      res.status(200).json(itemsFromDb);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

//  DELETE 

router.delete("/:id", (req, res, next) => {
  ItemModel.findByIdAndDelete(req.params.id)
    .then((itemsFromDb) => {
      // res.status(200).json(guitarDocument);
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
