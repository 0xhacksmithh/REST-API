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
    try {
            const user = await userModel.findOne({email:email});

            if(user){
                 const error = createHttpError(400, "User Already exists with this Email");
                return next(error);
            }
        
    } catch (error) {
        return next(createHttpError(500, "Error while get User"));
        
    }

    // process and Hash password

    let hashPassword;

    try {
       hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
        return next(createHttpError(500, "Error while hashing"));
    };
    

    let newUser;

    try {
      newUser = await userModel.create({
        name,
        email,
        password: hashPassword,
    })
    } catch (error) {
        return next(createHttpError(500, "User Creation Failed"));
    };

    // Token Generation
    try {
            const token = sign({sub: newUser._id}, config.jwtSecret, {expiresIn: "7d"});

    // Response
    res.status(201).json({acessToken: token});
    } catch (error) {
        return next(createHttpError(500, "Error while signing JWT token"));
    };

};

const loginUser = async(req, res, next)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return next(createHttpError(400, "All Feilds are required"));
    }

    let user;

    try {
        user = await userModel.findOne({email});
        if(!user){
            return next(createHttpError(404, "User not Found"));
        }
    } catch (error) {
        return next(createHttpError(500, "Database fetching failed"));
    }

    let isMatch;

    try {
        isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return next(createHttpError(400, "User Not Matched"));
        }
    } catch (error) {
        return next(createHttpError(500, "Bcrypt Failed"));
    };

    let token;  
    try {
        token = sign({sub: user._id}, config.jwtSecret, {expiresIn: "7d", algorithm: "HS256"});
    } catch (error) {
        return next(createHttpError(500, "Acess token creation failed"));
    }

    res.status(200).send({
        "AcessToken": token,
    });
};

export { createUser, loginUser};