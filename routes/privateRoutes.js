import express from "express";

const router = express.Router();

router.get("/admin", (req, res) => {
  res.json({
    message: "BRAVO LE VEAU T'ES CO",
    user: req.user,
    token: req.query.token,
  });
});

export default router;
