import { prisma } from "../config/prismaClient.js";

export class AlunoController {
  async listarTodos(req, res) {
    try {
      const alunos = await prisma.aluno.findMany({
        select: {
          id: true,
          nome: true,
          sobrenome: true,
          email: true,
          idade: true,
          peso: true,
          altura: true,
          fotos: {
            select: { id: true, filename: true },
            orderBy: { id: "desc" },
          },
        },
        orderBy: { id: "desc" },
      });

      const alunosComFotos = alunos.map((aluno) => ({
        ...aluno,
        fotos: aluno.fotos.map((foto) => ({
          ...foto,
          url: `${req.protocol}://${req.get("host")}/images/${foto.filename}}`,
        })),
      }));

      return res.status(200).json(alunosComFotos);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar alunos", error: error.message });
    }
  }

  async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const aluno = await prisma.aluno.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          nome: true,
          sobrenome: true,
          email: true,
          idade: true,
          peso: true,
          altura: true,
          fotos: {
            select: { id: true, filename: true },
            orderBy: { id: "desc" },
          },
        },
      });
      if (!aluno) {
        return res.status(400).json("Aluno não encontrado");
      }

      const alunoComFotos = {
        ...aluno,
        fotos: aluno.fotos.map((foto) => ({
          ...foto,
          url: `${req.protocol}://${req.get("host")}/images/${foto.filename}`,
        })),
      };
      return res.status(200).json(alunoComFotos);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar aluno", erro: error.message });
    }
  }

  async criarAluno(req, res) {
    const { nome, sobrenome, email, idade, peso, altura } = req.body;
    try {
      const novoAluno = await prisma.aluno.create({
        data: {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        },
      });
      return res.status(201).json({
        message: "Aluno cadastrado com sucesso",
        usuario: {
          id: novoAluno.id,
          nome: novoAluno.nome,
          sobrenome: novoAluno.sobrenome,
          email: novoAluno.email,
          idade: novoAluno.idade,
          peso: novoAluno.peso,
          altura: novoAluno.altura,
        },
      });
    } catch (error) {
      if (error.code === "P2002") {
        res
          .status(409)
          .json({ message: "E-mail já está em uso", erro: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Erro ao criar aluno", error: error.message });
      }
    }
  }

  async alterarAluno(req, res) {
    const { id } = req.params;
    const { nome, sobrenome, email, idade, peso, altura } = req.body;
    try {
      const alunoAtualizado = await prisma.aluno.update({
        where: { id: Number(id) },
        data: {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        },
      });
      return res.status(200).json({
        message: "Aluno atualizado com sucesso",
        aluno: alunoAtualizado,
      });
    } catch (error) {
      return res.status(404).json({
        message: "Aluno não encontrado ou erro ao atualizar",
        error: error.message,
      });
    }
  }

  async deletarAluno(req, res) {
    const { id } = req.params;
    try {
      const alunoDeletado = await prisma.aluno.delete({
        where: { id: Number(id) },
      });
      return res.json({
        message: "Aluno deletado com sucesso",
        aluno: {
          id: alunoDeletado.id,
          nome: alunoDeletado.nome,
          sobrenome: alunoDeletado.sobrenome,
          email: alunoDeletado.email,
          idade: alunoDeletado.idade,
          peso: alunoDeletado.peso,
          altura: alunoDeletado.altura,
        },
      });
    } catch (error) {
      return res
        .status(404)
        .json({ message: "Aluno não encontrado", error: error.message });
    }
  }
}
