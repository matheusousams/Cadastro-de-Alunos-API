import express from 'express';
import { usuariosRotas } from './routes/UsuarioRotas.js';
import { authRotas } from './routes/AuthRotas.js';
import { alunosRotas } from './routes/AlunoRotas.js';
import { fotoRotas } from './routes/FotoRotas.js';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(usuariosRotas, authRotas, alunosRotas, fotoRotas);

app.listen(3000, () => {
    console.log("rodando na porta http://localhost:3000/")
})
