import passport from "passport";
import { Strategy } from "passport-local";
import UtilisateurModel from "../models/utilisateurModel.js";
import JWT from "passport-jwt";

const { Strategy: JWTstrategy, ExtractJwt } = JWT;

passport.use(
  "inscription",
  new Strategy(
    {
      usernameField: "mail",
      passwordField: "mot_de_passe",
    },
    async (mail, mot_de_passe, done) => {
      try {
        const utilisateur = await UtilisateurModel.create({
          mail,
          mot_de_passe,
        });
        return done(null, utilisateur);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "connexion",
  new Strategy(
    {
      usernameField: "mail",
      passwordField: "mot_de_passe",
    },
    async (mail, mot_de_passe, done) => {
      try {
        const utilisateur = await UtilisateurModel.findOne({
          mail,
        });
        if (!utilisateur) {
          return done(null, false, { message: "Erreur de connexion" });
        }

        const validate = await utilisateur.isValidPassword(mot_de_passe);

        if (!validate) {
          return done(null, false, { message: "Erreur de connexion" });
        }

        return done(null, utilisateur, { message: "Connexion réussie." });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "mfsakp15342679*",
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token"),
    },
    async (token, done) => {
      try {
        return done(null, token.utilisateur);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
