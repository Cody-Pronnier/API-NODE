import RessourceModel from "../models/RessourceModel.js";
import mongoose from "mongoose";
import RessourceReactionModel from "../models/RessourceReactionModel.js";
import express from "express";


// Créer un ressource [OK]

export const ajoutRessource = async (req, res) => {
  const ressource = new RessourceModel({ _id: new mongoose.Types.ObjectId(), ...req.body });
  await ressource.save();
  res.send(ressource);
};

// Affiche tous les ressources [OK]

export const afficherRessources = async (req, res) => {
  const ressources = await RessourceModel.find({})
    .populate('utilisateur');
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
    res.status(404).send("Cette ressource n'existe pas.");
  }
  res.status(200).send();
};

export const ressourcesUtilisateur = async (req, res) => {
  const ressource = await RessourceModel.find({ _id: req.params.id })
    .populate('utilisateur');
  console.log(ressource);
  if (!ressource) {
    res.status(404).send("");
  }
  res.send(ressource);
};


// switch une ressource non valid à valid ou inversement

export const switchRessource = async (req, res) => {
  const ressource = await RessourceModel.find(
    req.params.id,
    req.body
  )
  if (!ressource) {
    res.status(404).send("Ce ressource n'existe pas.");
  }
  if (ressource.validation === true) {
    ressource.validation = false;
  } else {
    ressource.validation = true;
  }

  await ressource.save();
  res.send(ressource);
};

// Ajout ou Suppression d'un j'aime

export const reactionRessource = async (req, res) => {
  const ressource = await RessourceModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!ressource) {
    res.status(404).send("Ce ressource n'existe pas.");
  } else {
    var idexistant = await RessourceReactionModel.find({ ressource: ressource._id, utilisateur: '62a9dc084dc6033c7098a69a' });
    if (idexistant == null || idexistant == '') {
      const jaime = new RessourceReactionModel({ _id: new mongoose.Types.ObjectId(),ressource: ressource._id, utilisateur: '62a9dc084dc6033c7098a69a'  });
      await jaime.save();
      ressource.nb_reaction ++;
      await ressource.save();
      res.send(jaime, ressource);
    } else {
      const jenaimeplus = await RessourceReactionModel.findByIdAndDelete(idexistant);

      ressource.nb_reaction --;
      await ressource.save();
      res.status(200).send(jenaimeplus, ressource);
    }
  }
};

