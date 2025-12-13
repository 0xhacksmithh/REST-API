import createHttpError from "http-errors";


const createUser = async(req, res, next)=>{
    const { name, email, password } = req.body;
    // Validation
    if(!name || !email || !password){
        const error = createHttpError(400, "All feilds are required");

        return next(error);
    };

    // Process

    // Response
    res.json({message: "User created"});
};

export { createUser };