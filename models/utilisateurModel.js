import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const UtilisateurSchema = new Schema({
  nom: {
    type: String,
    trim: true,
    lowercase: true,
    required: true
  },
  prenom: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  },
  pseudo: {
    type: String,
    required: true
  },
  description: {
    type: String
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
  nbdabonne: {
    type: Number,
    default: 0
  },
  nbdabonnement: {
    type: Number,
    default: 0
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
    type : String,                //This Schema should be mentioned as a string
    required: false
  },
  ressources: [{
    type: Schema.Types.ObjectId,
    ref: "Ressource"
  }],
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    default: "623b03b7b994734c2c18628f"
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
