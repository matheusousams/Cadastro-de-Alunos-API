import { Router } from "express";
import { AlunoController } from "../controllers/AlunoController.js";
import loginRequired from "../middlewares/loginRequired.js";

const rotas = Router();
const aluno = new AlunoController();

rotas.get("/alunos", aluno.listarTodos);
rotas.get("/alunos/:id", aluno.listarPorId);

rotas.post("/alunos", loginRequired, aluno.criarAluno);

rotas.put("/alunos/:id", loginRequired, aluno.alterarAluno);
rotas.delete("/alunos/:id", loginRequired, aluno.deletarAluno);

export { rotas as alunosRotas };