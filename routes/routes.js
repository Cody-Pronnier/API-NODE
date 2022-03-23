import express from "express";
import {
  ajoutUtilisateur,
  afficherUtilisateurs,
  afficherUtilisateur,
  modifierUtilisateur,
  supprimerUtilisateur,
  allRessourceDeUtilisateur,
} from "./../controllers/userControllers.js";
import {
  ajoutRessource,
  afficherRessources,
  afficherressource,
  modifierRessource,
  supprimerRessource,
} from "./../controllers/ressourceController.js";
import { catchErrors } from "../helpers.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Routes pour utilisateur

router.post("/api/utilisateur", catchErrors(ajoutUtilisateur));
router.get("/api/utilisateur", catchErrors(afficherUtilisateurs));
router.get("/api/utilisateur/:id", catchErrors(afficherUtilisateur));
router.patch("/api/utilisateur/:id", catchErrors(modifierUtilisateur));
router.delete("/api/utilisateur/:id", catchErrors(supprimerUtilisateur));
router.get("/api/utilisateur/:id/ressources", catchErrors(allRessourceDeUtilisateur));

// Routes pour ressource

router.post("/api/ressource", catchErrors(ajoutRessource));
router.get("/api/ressource", catchErrors(afficherRessources));
router.get("/api/ressource/:id", catchErrors(afficherressource));
router.patch("/api/ressource/:id", catchErrors(modifierRessource));
router.delete("/api/ressource/:id", catchErrors(supprimerRessource));

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
        const token = jwt.sign({utilisateur: body}, 'mfsakp15342679*')
        
        res.json({token});
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export default router;
