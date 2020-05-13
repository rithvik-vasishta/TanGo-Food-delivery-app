require('dotenv').config();
const envVars=process.env

module.exports={
    port: envVars.PORT,
    env: envVars.NODE_ENV,
    mongo: {
        uri:envVars.MONGDB_URI,
        port:envVars.MONGO_PORT,
        isDebug:envVars.MONGOOSE_DEBUG
    },
    jwtSecret:envVars.JWT_SECRET
};
