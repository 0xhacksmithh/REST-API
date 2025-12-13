import { config as conf } from 'dotenv';

conf();

const _config = {
    PORT: process.env.PORT,

    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
}

export const config = Object.freeze(_config); 