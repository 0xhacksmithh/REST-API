import express from 'express';
import { config } from './config/config.js';
import createHttpError from 'http-errors';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import userRouter from './user/userRouter.js';
import bookRouter from './book/bookRouter.js';

const app = express();

app.use(express.json());

// Routes

app.get("/", (req, res)=>{
    
    const error = createHttpError(400, "Something Fishy");

    throw error;

    res.json({message : 'HII'});
})


app.use("/api/users", userRouter);

app.use("/api/books", bookRouter);


// Gobal Error Handler
app.use(globalErrorHandler);


export default app;