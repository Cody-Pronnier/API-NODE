import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RessourceSchema = new Schema({
  texte: {
    type: String,
    trim: true,
    lowercase: true,
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur"
  },
  commentaires: [{
    type: Schema.Types.ObjectId,
    ref: "Commentaire"
  }]
});

const RessourceModel = mongoose.model("Ressource", RessourceSchema);
export default RessourceModel;