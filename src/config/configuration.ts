import * as dotEnv from 'dotenv'
dotEnv.config();

export default ()=>({
    app : {
        name: process.env.APP_NAME || 'Bank App',
        version: process.env.APP_VERSION || 'v1',
        port: parseInt(process.env.APP_PORT,10)  || 3001,
        environment: process.env.NODE_ENV || 'dev'
    }
})