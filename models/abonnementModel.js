import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AbonnementSchema = new Schema({
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur"
  },
  abonnement: [{
    type: Schema.Types.ObjectId,
    ref: "Utilisateur"
  }]
});

const AbonnementModel = mongoose.model("Abonnement", AbonnementSchema);
export default AbonnementModel;