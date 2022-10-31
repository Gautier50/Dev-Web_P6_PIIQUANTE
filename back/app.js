//Import package express 
const express = require('express');

const bodyParser = require('body-parser');

const app = express();


//Import module path pour la gestion de chemins de stockage
const path = require("path");

//Import du module pour la gestion des headers
const cors = require("cors");

//Import du module pour la base de données
const mongoose = require("mongoose");

//Import de dotenv pour cacher les id et password
const dotenv = require('dotenv');
dotenv.config();

//Import des routes
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

//Import du module morgan pour l'aide au developpement. Retourne les requetes dans la console 
const morgan = require('morgan');


//Connexion avec la base de données
mongoose
  .connect(
    "mongodb+srv://Gautier:104A4B77@cluster-p6.ianjtcf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
  
  // Récupère le corps des requetes post
  app.use(express.json());

  //Mise en place des headers
  app.use(cors());
  app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, PATCH, OPTIONS"
          );
          next();
        });

        app.use(bodyParser.json());
        // app.post("/api/sauce", (req, res, next) => {
          // console.log(req.body);
          // res.status(201).json({
            //   message: "sauce créée !"
            // })
            // });
            
            // app.get("/api/sauce",(req, res, next) => {
              
              // });
              app.use(morgan("dev"));

              app.use("/images", express.static(path.join(__dirname, "images")));
              app.use("/api/sauces", sauceRoutes);
              app.use("/api/auth", userRoutes);
              
              //Export de l'app
              module.exports = app;
