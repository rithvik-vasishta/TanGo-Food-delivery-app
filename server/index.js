const app = require('./config/express');
const config = require('./config/config');


app.listen(config.port,()=>{
    console.log(`server started on port ${config.port} (${config.env})`);
});
