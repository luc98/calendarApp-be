const express = require('express');
require('dotenv').config();
var cors = require('cors')
const {dbConnection} = require('./database/config')
// crear servidor

const app = express();
// http://localhost:4000/
// escuchar peticiones
//* DB 
dbConnection();

//* cors
app.use(cors());


//* directorio publico
app.use( express.static('public') );

//* Lectura y parseo del body
app.use( express.json() );

//* Rutas}
app.use('/api/auth', require( "./routes/auth" ));

//TODO CRUD
app.use('/api/events', require( "./routes/events" ));


app.listen(process.env.PORT,()=>{
    console.log("servidor en puerto "+process.env.PORT );
});