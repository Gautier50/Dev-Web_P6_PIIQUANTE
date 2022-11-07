// Import du model user //
const User = require("../models/user");

// Import du package de hachage du mot de passe //
const bcrypt = require("bcrypt");

// Rappel de jwt pour le token //
const jwt = require("jsonwebtoken");

// Fonction Signup //
exports.signup = (req, res, next) => {
  console.log("========");
  console.log(req.body.password);

  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      console.log("test");
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      console.log(user);
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Fonction Login //
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
       return res.status(401).json({ message: "Identifiant(s) invalide !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ message: "Identifiant(s) invalide !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
              expiresIn: "24h",
            }),
          });
        })

        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
