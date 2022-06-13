import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    _id : Schema.Types.ObjectId,
    nom: {
        type: String,
        trim: true,
    },
    trigramme: {
        type: String,
        trim: true,
        uppercase: true
    },
    utilisateurs: [{
        type: Schema.Types.ObjectId,
        ref: "Utilisateur"
      }]
});

const RoleModel = mongoose.model("Role", RoleSchema);
export default RoleModel;