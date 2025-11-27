import multer from "multer";
import { dirname, extname, resolve } from "path";
import { fileURLToPath } from "url";

const rand = () => Math.floor(Math.random() * 10000 + 10000);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {

    fileFilter: (req, file, cb) => {
        if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new multer.MulterError("Arquivo precisa ser PNG ou JPG"));
        }

        return cb(null, true); 
    },

    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}${rand()}${extname(file.originalname)}`);
        },
    }),

};