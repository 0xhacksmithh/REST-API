import app from './src/app.js';
import { config } from './src/config/config.js';
import connectDB from './src/config/db.js';


const PORT = config.PORT || 3000;
const serverStart = async()=>{
    // connect Database
    await connectDB();

    app.listen(PORT, ()=>{
        console.log(`Server is runingggg on PORT: ${PORT}`)
    })
}

serverStart();