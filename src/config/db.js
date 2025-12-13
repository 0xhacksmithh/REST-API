import mongoose from "mongoose";
import { config } from "./config.js";


const connectDB = async()=>{
    try {
        mongoose.connection.on('connected', ()=>{
        console.log("Connected to database Secessfully...");
        })

        mongoose.connection.on('error', ()=>{
            console.log('Eror in Connecting to Database', error);
        })

        await mongoose.connect(config.MONGO_CONNECTION_STRING);

    } catch (error) {
        console.error("Failed to connect..", error);

        process.exit(1);
    }
}

export default connectDB;