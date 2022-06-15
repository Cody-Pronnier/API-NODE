import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentaireSchema = new Schema({
  description: {
    type: String,
    trim: true,
  },
  date_creation: {
    type: Date,
    required: true,
    default: Date.now,
  },
  validation: {
    type: Boolean,
    default: false,
  },
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true
  },
  ressource: [{
    type: Schema.Types.ObjectId,
    ref: "Ressource",
    required: true
  }]
});

const CommentaireModel = mongoose.model("Commentaire", CommentaireSchema);
export default CommentaireModel;