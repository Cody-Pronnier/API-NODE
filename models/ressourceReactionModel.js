import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RessourceReactionSchema = new Schema({
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur"
  },
  ressource: [{
    type: Schema.Types.ObjectId,
    ref: "Ressource"
  }]
});

const RessourceReactionModel = mongoose.model("RessourceReaction", RessourceReactionSchema);
export default RessourceReactionModel;