import { Router } from "express";
import { AuthController } from "../controllers/AuthController.js";

const rotas = Router();
const auth = new AuthController();

// rotas.post("/registro", auth.registro);
rotas.post("/login", auth.login);

export { rotas as authRotas}