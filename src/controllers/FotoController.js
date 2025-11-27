import { prisma } from "../config/prismaClient.js"
import multer from "multer";
import multerConfig from "../config/multerConfig.js";

const upload = multer(multerConfig).single('foto');

export class FotoController {

    store(req, res) {
        return upload(req, res, async (error) => {
            if (error) {
                return res.status(400).json({
                    errors: error.code,
                });
            }

            try {

                const { originalname, filename } = req.file;
                const { aluno_id } = req.body;

                const foto = await prisma.foto.create({
                    data: {
                        originalname,
                        filename,
                        aluno_id: parseInt(aluno_id)
                    },
                });

                return res.json(foto);
            } catch (error) {
                return res.status(400).json({
                    message: "Aluno não existe",
                    error: error.message
                })
            }

        });
    }
}