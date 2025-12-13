import { config as conf } from 'dotenv';

conf();

const _config = {
    PORT: process.env.PORT,

    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,

    env: process.env.NODE_ENV,

    jwtSecret: process.env.JWT_SECRET,
}

export const config = Object.freeze(_config); 