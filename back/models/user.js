const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: "String", required: true, unique: true },
  password: { type: "String", required: true },
});

//Rappel du plugin uniqueValidator
userSchema.plugin(uniqueValidator);

//Export du modele utilisateur
module.exports = mongoose.model("User", userSchema);
