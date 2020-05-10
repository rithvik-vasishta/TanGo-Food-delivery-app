const app = require('./config/express');
const config = require('./config/config');

//initiate db module
require('./config/mongoose');

app.listen(config.port,()=>{
    console.log(`server started on port ${config.port} (${config.env})`);
});
