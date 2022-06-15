import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RessourceSchema = new Schema({
  texte: {
    type: String,
    trim: true,
  },
  titre: {
    type: String,
    trim: true,
  },
  date_creation: {
    type: Date,
    required: true,
    default: Date.now,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true
  },
  commentaires: [{
    type: Schema.Types.ObjectId,
    ref: "Commentaire"
  }]
});

const RessourceModel = mongoose.model("Ressource", RessourceSchema);
export default RessourceModel;