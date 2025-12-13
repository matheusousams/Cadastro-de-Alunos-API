import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";
import loginRequired from "../middlewares/loginRequired.js";

const rotas = Router();
const usuario = new UsuarioController();

rotas.get("/usuarios", usuario.listarTodos);
// rotas.get("/usuarios/:id", usuario.listarPorId);

rotas.post("/usuarios", usuario.criarUsuario);

// O usuário não pode ter permissão para alterar ou deletar outros usuarios, então retira-se /:id e insere login required
rotas.put("/usuarios", loginRequired, usuario.alterarUsuario);
rotas.delete("/usuarios", loginRequired, usuario.deletarUsuario);

export { rotas as usuariosRotas };
