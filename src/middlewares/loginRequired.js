import jwt from "jsonwebtoken";
import { prisma } from "../config/prismaClient.js"

const JWT_SECRET = process.env.JWT_SECRET || "chave_secreta";


export default async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            message: "Login Required"
        });
    }

    const [, token] = authorization.split(' ');

    try {
        const dados = jwt.verify(token, JWT_SECRET);
        const { id, email } = dados;

        const usuario = await prisma.usuario.findUnique({
            where: {
                id,
                email
            },
        });

        if (!usuario) {
            return res.status(401).json({
                message: "Usuário inválido",
                error: error.message
            });
        }

        req.userId = id;
        req.userEmail = email;
        return next();
    } catch (error) {
        return res.status(401).json({
            message: "Token expirado ou inválido",
            error: error.message
        });
    }
}