import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AbonneSchema = new Schema({
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur"
  },
  abonne: [{
    type: Schema.Types.ObjectId,
    ref: "Utilisateur"
  }]
});

const AbonneModel = mongoose.model("Abonne", AbonneSchema);
export default AbonneModel;