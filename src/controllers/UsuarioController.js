import { prisma } from "../config/prismaClient.js"
import bcrypt from "bcrypt";

export class UsuarioController {

    async listarTodos(req, res) {
        try {
            const usuarios = await prisma.usuario.findMany({
                select: {
                    id: true,
                    nome: true,
                    email: true,
                },
            });
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar usuários", erro: error.message });
        }
    };

    async listarPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await prisma.usuario.findUnique({
                where: { id : Number(id) },
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            });
            return usuario ? res.status(200).json(usuario) : res.status(400).json("Usuário não encontrado");
            
        } catch (error) {
            return res.status(500).json({ message: "Erro ao buscar usuário", erro: error.message });
        }
    };
    
    async criarUsuario(req, res) {
        const { nome, email, senha } = req.body;
        try {
            const criptografia = await bcrypt.hash(senha, 10);
            const novoUsuario = await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    senha: criptografia,
                },
            });
            return res.status(201).json({
                message: "Usuário cadastrado com sucesso",
                usuario: {
                    id: novoUsuario.id,
                    nome: novoUsuario.nome,
                    email: novoUsuario.email,
                }
            });
        } catch (error) {
            if(error.code === "P2002") {
                res.status(409).json({ message: "E-mail já está em uso", erro: error.message });
            } else {
                res.status(500).json( { message: "Erro ao criar usuário", error: error.message });
            }
        }
    }

    async alterarUsuario(req, res) {
        // const { id } = req.params;
        const id = req.userId;
        const { nome, email} = req.body;
        try {
            const usuarioAtualizado = await prisma.usuario.update({
                where: { id: Number(id)},
                data: {
                    nome,
                    email
                },
            });
            return res.status(200).json({ message: "Usuário atualizado com sucesso", usuario: usuarioAtualizado });
        } catch (error) {
            return res.status(404).json({ message: "Usuário não encontrado ou erro ao atualizar", error: error.message });
        }
    };

    async deletarUsuario(req, res) {
        // const { id } = req.params;
        const id = req.userId;
        try {
            const usuarioDeletado = await prisma.usuario.delete({
                where: { id : Number(id)},
            });
            return res.json({
                message: "Usuário deletado com sucesso",
                usuario: {
                    id: usuarioDeletado.id,
                    nome: usuarioDeletado.nome,
                    email: usuarioDeletado.email
                },
            });
        } catch (error) {
            return res.status(404).json({ message: "Usuario não encontrado", error: error.message});
        }
    }



}

