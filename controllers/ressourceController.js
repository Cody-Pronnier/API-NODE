import RessourceModel from "../models/RessourceModel.js";
import mongoose from "mongoose";

// Créer un ressource [OK]

export const ajoutRessource = async (req, res) => {
  const ressource = new RessourceModel({_id: new mongoose.Types.ObjectId(), ...req.body});
  await ressource.save();
  res.send(ressource);
};

// Affiche tous les ressources [OK]

export const afficherRessources = async (req, res) => {
  const ressources = await RessourceModel.find({});
  res.send(ressources);
};

// Affiche un ressource [OK]

export const afficherressource = async (req, res) => {
  const ressource = await RessourceModel.find({ _id: req.params.id });
  res.send(ressource);
};

// Modifie un ressource [OK]

export const modifierRessource = async (req, res) => {
  const ressource = await RessourceModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!ressource) {
    res.status(404).send("Cette ressource n'existe pas.");
  }
  await ressource.save();
  res.send(ressource);
};

// Supprime un ressource [OK]

export const supprimerRessource = async (req, res) => {
  const ressource = await RessourceModel.findByIdAndDelete(req.params.id);
  if (!ressource) {
    res.status(404).send("Cet ressource n'existe pas.");
  }
  res.status(200).send();
};

export const allCommentairesDeUtilisateur = async (req, res) => {
  const ressource = await RessourceModel.find({ _id: req.params.id }).populate('commentaires');
  if (!ressource) {
    res.status(404).send("Cette ressource n'existe pas.");
  }
  console.log(ressource);
  res.send(ressource);
};