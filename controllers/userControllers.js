import UtilisateurModel from "../models/utilisateurModel.js";

// Créer un utilisateur [OK]

export const ajoutUtilisateur = async (req, res) => {
  const user = new UtilisateurModel(req.body);
  user.image = req.file.path.substring(14);
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
