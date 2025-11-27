import { Router } from "express";
import loginRequired from "../middlewares/loginRequired.js"
import { FotoController } from "../controllers/FotoController.js";


const rotas = Router();
const foto = new FotoController();

rotas.post('/fotos', loginRequired, foto.store);

export { rotas as fotoRotas }