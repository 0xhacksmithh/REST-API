import createHttpError from "http-errors";
import userModel from "./userModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const { sign, verify } = jwt;

const createUser = async(req, res, next)=>{
    const { name, email, password } = req.body;
    // Validation
    if(!name || !email || !password){
        const error = createHttpError(400, "All feilds are required");

        return next(error);
    };

    // Database Call
    const user = await userModel.findOne({email:email});

    if(user){
        const error = createHttpError(400, "User Already exists with this Email");
        return next(error);
    }

    // process and Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        name,
        email,
        password: hashPassword,
    })

    // Token Generation
    const token = sign({sub: newUser._id}, config.jwtSecret, {expiresIn: "7d"});

    // Response
    res.json({acessToken: token});
};

export { createUser };