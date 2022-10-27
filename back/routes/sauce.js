//Import express
const express = require('express');
//Import module router d'express
const router = express.Router();
//Import middleware authentification
const auth = require('../middleware/auth');
//Import middleware multer pour la gestion des images
const multer = require('../middleware/multer-config');
//Import du controlleur sauce
const sauceCtrl = require('../controllers/sauce');

// Route post pour la création d'une sauce 
// router.post('/', auth, multer, sauceCtrl.createSauce);
// Route pour récupérer une sauce 
// router.get('/:id',auth, sauceCtrl.getOneSauce);
// // Route pour récupérer toute les sauces
// router.get('/' ,auth, sauceCtrl.getAllSauce);
// // Route pour modifier  une sauce
// router.put('/:id',auth, multer, sauceCtrl.modifySauce);
// //Route pour supprimer une sauce 
// router.delete('/:id', auth, multer,  sauceCtrl.deleteOneSauce)
// // Route pour liker ou disliker une sauce 
// router.post('/:id/like', auth, sauceCtrl)

//Export module router
module.exports = router;








