//Import package express
const express = require("express");

const app = express();
//Import du module pour la base de données
const mongoose = require("mongoose");

//Import module path pour la gestion de chemins de stockage
const path = require("path");

//Import du module pour la gestion des headers
const cors = require("cors");

//Import du module de sécurité helmet
const helmet = require("helmet");

//Import de dotenv pour cacher les id et password
const dotenv = require("dotenv");
dotenv.config();

//Import des routes
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

//Connexion avec la base de données
mongoose
  .connect(
    process.env.SECRET_DB
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
  
  //Import du module morgan pour l'aide au developpement. Retourne les requetes dans la console
  const morgan = require("morgan");
  
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
      
app.use(helmet());
      
app.use(morgan("dev"));

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

//Export de l'app
module.exports = app;
