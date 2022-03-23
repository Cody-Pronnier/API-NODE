import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes.js";
import privateRoutes from "./routes/privateRoutes.js";
import passport from "passport";
import "./auth/auth.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));

app.use(express.json());

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(
  "/private",
  passport.authenticate("jwt", { session: false }),
  privateRoutes
);

app.use(routes);

app.listen(PORT, () => {
  console.log(`Le serveur a bien été lancé sur le port: ${PORT}`);
});
