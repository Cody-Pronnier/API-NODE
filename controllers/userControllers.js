import UtilisateurModel from "../models/utilisateurModel.js";
import AbonnementModel from "../models/abonnementModel.js";
import mongoose from "mongoose";
// Créer un utilisateur [OK]

export const ajoutUtilisateur = async (req, res) => {
  const user = new UtilisateurModel(req.body);
  // user.image = req.file.path.substring(14)
  await user.save();
  res.send(user);
};

// Affiche tous les utilisateurs [OK]

export const afficherUtilisateurs = async (req, res) => {
  const users = await UtilisateurModel.find({});
  res.send(users);
};

// Affiche un utilisateur [OK]

export const afficherUtilisateur = async (req, res) => {
  const user = await UtilisateurModel.findOne({ _id: req.params.id }).exec()
  res.send(user);
};

// Modifie un utilisateur [OK]

export const modifierUtilisateur = async (req, res) => {
  const user = await UtilisateurModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!user) {
    res.status(404).send("Cet utilisateur n'existe pas.");
  }
  await user.save();
  res.send(user);
};

// Supprime un utilisateur [OK]

export const supprimerUtilisateur = async (req, res) => {
  const user = await UtilisateurModel.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).send("Cet utilisateur n'existe pas.");
  }
  res.status(200).send();
};

export const toutesRessourcesDeUtilisateur = async (req, res) => {
  const user = await UtilisateurModel.find({ _id: req.params.id })
    .populate('ressources');
  console.log(user);
  if (!user) {
    res.status(404).send("Cet utilisateur n'existe pas.");
  }
  res.send(user);
};


// switch un compte non valid à valid ou inversement

export const switchCompteUtilisateur = async (req, res) => {
  const user = await UtilisateurModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!user) {
    res.status(404).send("Cet utilisateur n'existe pas.");
  }
  if (user.compte_actif === true) {
    user.compte_actif = false;
  } else {
    user.compte_actif = true;
  }

  await user.save();
  res.send(user);
};

// FONCTION POUR FOLLOW OU UNFOLLOW QUELQU'UN

export const follow = async (req, res) => {
  const utilisateur = await UtilisateurModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!utilisateur) {
    res.status(404).send("Cet utilisateur n'existe pas.");
  } else {
    var idexistant = await AbonnementModel.find({ utilisateur: utilisateur._id, abonnement: '62a9da694dc6033c7098a68b' });
    if (idexistant == null || idexistant == '') {
      //ON CREE LE FOLLOW
      const follow = new AbonnementModel({ _id: new mongoose.Types.ObjectId(), utilisateur: utilisateur._id, abonnement: '62a9da694dc6033c7098a68b' });
      await follow.save();

      // ON INCREMENTE LE NOMBRE D'ABONNE
      utilisateur.nbdabonne++;
      await utilisateur.save();

      // ON INCREMENT LE NOMBRE D'ABONNEMENT
      var abonnement = await UtilisateurModel.findById({ _id: '62a9da694dc6033c7098a68b' });
      abonnement.nbdabonnement ++;
      await abonnement.save();

      res.send(follow, utilisateur, abonnement);
    } else {
      // On delete l'existance de l'id
      const unfollow = await AbonnementModel.findByIdAndDelete(idexistant);
      //On decremante le nombre dabonné
      utilisateur.nbdabonne --;
      await utilisateur.save();

      //On decremante le nombre dabonnement
      var abonnement = await UtilisateurModel.findById({ _id: '62a9da694dc6033c7098a68b' });
      abonnement.nbdabonnement--;
      await abonnement.save();

      res.status(200).send(unfollow, utilisateur, abonnement);
    }
  }
};