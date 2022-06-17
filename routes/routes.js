import express from "express";
import {
  ajoutUtilisateur,
  afficherUtilisateurs,
  afficherUtilisateur,
  modifierUtilisateur,
  supprimerUtilisateur,
  toutesRessourcesDeUtilisateur,
  switchCompteUtilisateur,
  follow
} from "./../controllers/userControllers.js";
import {
  ajoutRessource,
  afficherRessources,
  afficherressource,
  modifierRessource,
  supprimerRessource,
  ressourcesUtilisateur,
  reactionRessource,
  switchRessource
} from "./../controllers/ressourceController.js";

import { catchErrors } from "../helpers.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  afficherCommentaire,
  afficherCommentaires,
  ajoutCommentaire,
  modifierCommentaire,
  supprimerCommentaire,
  switchCommentaire,
} from "../controllers/commentaireController.js";
import {
  afficherRole,
  afficherRoles,
  ajoutRole,
  modifierRole,
  supprimerRole,
} from "../controllers/roleController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    var date = new Date().toLocaleDateString();
    cb(
      null,
      date + "-" + Math.round(Math.random() * 10000) + "-" + file.originalname
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("l'image n'est pas acceptée"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// Routes pour utilisateur

router.post("/api/utilisateur", catchErrors(ajoutUtilisateur));
router.get("/api/utilisateur", catchErrors(afficherUtilisateurs));
router.get("/api/utilisateur/:id", catchErrors(afficherUtilisateur));
router.patch("/api/utilisateur/:id", catchErrors(modifierUtilisateur));
router.patch("/api/utilisateur/:id/follow", catchErrors(follow));
router.patch(
  "/api/utilisateur/:id/switch",
  catchErrors(switchCompteUtilisateur)
);
router.delete("/api/utilisateur/:id", catchErrors(supprimerUtilisateur));
router.get(
  "/api/utilisateur/:id/ressources",
  catchErrors(toutesRessourcesDeUtilisateur)
);

// Routes pour ressource
router.post("/api/ressource", catchErrors(ajoutRessource));
router.get("/api/ressource", catchErrors(afficherRessources));
router.get("/api/ressource/:id/utilisateur", catchErrors(ressourcesUtilisateur));
router.get("/api/ressource/:id", catchErrors(afficherressource));
router.patch("/api/ressource/:id", catchErrors(modifierRessource));
router.patch("/api/ressource/:id/switch", catchErrors(switchRessource));
router.patch("/api/ressource/:id/reaction", catchErrors(reactionRessource));
router.delete("/api/ressource/:id", catchErrors(supprimerRessource));
// Routes pour ressource

router.post("/api/commentaire", catchErrors(ajoutCommentaire));
router.get("/api/commentaire", catchErrors(afficherCommentaires));
router.get("/api/commentaire/:id", catchErrors(afficherCommentaire));
router.patch("/api/commentaire/:id", catchErrors(modifierCommentaire));
router.patch("/api/commentaire/:id/switch", catchErrors(switchCommentaire));
router.delete("/api/commentaire/:id", catchErrors(supprimerCommentaire));

// Routes pour role

router.post("/api/role", catchErrors(ajoutRole));
router.get("/api/role", catchErrors(afficherRoles));
router.get("/api/role/:id", catchErrors(afficherRole));
router.patch("/api/role/:id", catchErrors(modifierRole));
router.delete("/api/role/:id", catchErrors(supprimerRole));
// Routes pour authentification

router.post(
  "/api/inscription",
  passport.authenticate("inscription", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "Inscription ok",
      user: req.user,
    });
  }
);

router.post("/api/connexion", (req, res, next) => {
  passport.authenticate("connexion", async (err, utilisateur) => {
    try {
      if (err || !utilisateur) {
        const error = new Error("Une erreur est survenue");
        return next(error);
      }

      req.login(utilisateur, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: utilisateur._id, mail: utilisateur.mail };
        const token = jwt.sign({ utilisateur: body }, "mfsakp15342679*");

        res.json({ token, body });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;
