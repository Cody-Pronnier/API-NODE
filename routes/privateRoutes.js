import express from "express";
import { reactionRessource } from "./../controllers/ressourceController.js";
import { catchErrors } from "../helpers.js";

const router = express.Router();

router.patch("/api/ressource/:id/test", (req, res, reaction) => {
  res.json({
    message: "BRAVO LE VEAU T'ES CO",
    user: req.user,
    token: req.query.token,
  });
});

export const reaction = async (req, res) => {
console.log("TEST");
};

export default router;
