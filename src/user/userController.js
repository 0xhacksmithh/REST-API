import createHttpError from "http-errors";
import userModel from "./userModel.js";


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

    // Process

    // Response
    res.json({message: "User created"});
};

export { createUser };