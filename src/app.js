import express from 'express';
import { config } from './config/config.js';
import createHttpError from 'http-errors';
import globalErrorHandler from './middlewares/globalErrorHandler.js';

const app = express();

// Routes

app.get("/", (req, res)=>{
    
    const error = createHttpError(400, "Something Fishy");

    throw error;

    res.json({message : 'HII'});
})



// Gobal Error Handler
app.use(globalErrorHandler);


export default app;