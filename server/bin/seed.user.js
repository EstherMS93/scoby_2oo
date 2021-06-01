const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../config/dbConnection");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = 10;

const users = [
    {
        firstName: "Olivier",
        lastName: "Bab",
        profileImg: "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        email: "toto@gmail.com",
        password: bcrypt.hashSync("1234", salt),
        phoneNumber: "1234",
    },

    {
        firstName: "Esther",
        lastName: "Martinez",
        profileImg:
                "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",

        email:  "toto2@gmail.com",
        password: bcrypt.hashSync("1234", salt),
        phoneNumber: "012",
    },
]
User.create(users)
  .then((userDocument) => {
    console.log(userDocument);
  })
  .catch((error) => {
    console.log(error);
  });