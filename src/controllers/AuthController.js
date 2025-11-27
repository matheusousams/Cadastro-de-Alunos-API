import { AuthService } from "../services/AuthService.js";

export class AuthController {

    async login(req, res) {
        
        const { email, senha } = req.body;

        try {
            const loginUsuario = await AuthService.logarUsuario({ email, senha });
            res.status(200).json({
                message: 'Login realizado com sucesso',
                ...loginUsuario
            });
        } catch (error) {
            res.status(401).json({ message: "Login mal-sucedido", error: error.message });
        }
    };
    
 };