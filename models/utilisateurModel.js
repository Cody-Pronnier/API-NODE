import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UtilisateurSchema = new mongoose.Schema({
  nom: {
    type: String,
    trim: true,
    lowercase: true,
  },
  prenom: {
    type: String,
    trim: true,
    lowercase: true,
  },
  mail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  mot_de_passe: {
    type: String,
    required: true,
  },
  date_creation: {
    type: Date,
    required: true,
    default: Date.now,
  },
  compte_actif: {
    type: Boolean,
    default: false,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
});

// Pré hash - avant save bdd [OK]

UtilisateurSchema.pre("save", async function (next) {
  const utilisateur = this;
  const hash = await bcrypt.hash(utilisateur.mot_de_passe, 10);

  utilisateur.mot_de_passe = hash;

  next();
});

// Vérifie le mot de passe [OK]

UtilisateurSchema.methods.isValidPassword = async function (mot_de_passe) {
  const utilisateur = this;

  const verif = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);

  return verif; // Retourne true ou false
};

const UtilisateurModel = mongoose.model("Utilisateur", UtilisateurSchema);

export default UtilisateurModel;
