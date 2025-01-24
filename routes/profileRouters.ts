import { Router } from "express";

export const profileRouters = Router();

profileRouters.get("/", (req, res) => {
  res.send("Profile page");
});
