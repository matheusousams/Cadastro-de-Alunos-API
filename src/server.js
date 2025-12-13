import express from "express";
import { usuariosRotas } from "./routes/UsuarioRotas.js";
import { authRotas } from "./routes/AuthRotas.js";
import { alunosRotas } from "./routes/AlunoRotas.js";
import { fotoRotas } from "./routes/FotoRotas.js";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  "/images",
  express.static(resolve(__dirname, "..", "uploads", "images"))
);

app.use(usuariosRotas, authRotas, alunosRotas, fotoRotas);

app.listen(3000, () => {
  console.log("rodando na porta http://localhost:3000/");
});
