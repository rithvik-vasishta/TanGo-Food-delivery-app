const app = require('./config/express');
const config = require('./config/config');
const http=require('http');
//initiate db module
require('./config/mongoose');

app.listen(config.port,()=>{
    console.log(`server started on port ${config.port} (${config.env})`);
});
