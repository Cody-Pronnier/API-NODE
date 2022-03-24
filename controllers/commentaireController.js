import CommentaireModel from "../models/CommentaireModel.js";

// Créer un commentaire [OK]

export const ajoutCommentaire = async (req, res) => {
  const commentaire = new CommentaireModel(req.body);
  await commentaire.save();
  res.send(commentaire);
};

// Affiche tous les commentaire [OK]

export const afficherCommentaires = async (req, res) => {
  const commentaires = await CommentaireModel.find({});
  res.send(commentaires);
};

// Affiche un commentaire [OK]

export const afficherCommentaire = async (req, res) => {
  const commentaire = await CommentaireModel.find({ _id: req.params.id });
  res.send(ressource);
};

// Modifie un commentaire [OK]

export const modifierCommentaire = async (req, res) => {
  const commentaire = await CommentaireModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  if (!commentaire) {
    res.status(404).send("Ce commentaire n'existe pas.");
  }
  await commentaire.save();
  res.send(commentaire);
};

// Supprime un commentaire [OK]

export const supprimerCommentaire = async (req, res) => {
  const commentaire = await CommentaireModel.findByIdAndDelete(req.params.id);
  if (!ressource) {
    res.status(404).send("Ce commentaire n'existe pas.");
  }
  res.status(200).send();
};
