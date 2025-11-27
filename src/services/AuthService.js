import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { prisma } from "../config/prismaClient.js"

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;

export const AuthService = {

    async logarUsuario( { email, senha }) {
        
        if(!email || !senha) throw new Error("Credenciais inválidas");

        const usuario = await prisma.usuario.findUnique( { where: { email }});
        if(!usuario) throw new Error("Usuário não existe");

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida) throw new Error("Senha incorreta");
        
        const { id } = usuario;
        
        const token = jwt.sign({
            id,
            email
            // UsuarioId: usuario.id,
            // email: usuario.email
        }, JWT_SECRET, {
            expiresIn: TOKEN_EXPIRATION
        });

        return {
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
        };

    },
};