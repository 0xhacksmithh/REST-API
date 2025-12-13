import app from './src/app.js';
import { config } from './src/config/config.js';


const PORT = config.PORT || 3000;
const serverStart = ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on PORT: ${PORT}`)
    })
}

serverStart();