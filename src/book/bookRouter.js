
import express from 'express';
import { createBook } from './bookController.js';
import multer from 'multer';
import path from "path";
import { fileURLToPath } from "url";



const bookRouter = express.Router();



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// file store local
const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: {fileSize: 3e7} // 30mb = 30 * 1024 * 1024
})

// Routes

bookRouter.post("/register", upload.fields([{name: "coverImage", maxCount: 1}, {name:"file", maxCount: 1}]),createBook);


export default bookRouter;