import RoleModel from "../models/RoleModel.js";
import mongoose from "mongoose";

// Créer un role [OK]

export const ajoutRole = async (req, res) => {
  const role = new RoleModel(req.body);
  await role.save();
  res.send(role);
};

// Affiche tous les roles [OK]

export const afficherRoles = async (req, res) => {
  const roles = await RoleModel.find({});
  res.send(roles);
};

// Affiche un role [OK]

export const afficherRole = async (req, res) => {
  const role = await RoleModel.find({ _id: req.params.id });
  res.send(role);
};

// Modifie un role [OK]

export const modifierRole = async (req, res) => {
  const role = await RoleModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!role) {
    res.status(404).send("Ce role n'existe pas.");
  }
  await role.save();
  res.send(role);
};

// Supprime un ressource [OK]

export const supprimerRole = async (req, res) => {
  const role = await RoleModel.findByIdAndDelete(req.params.id);
  if (!role) {
    res.status(404).send("Ce role n'existe pas.");
  }
  res.status(200).send();
};
