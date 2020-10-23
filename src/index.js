//#region We will import the modules we need
const express = require('express');
const cors = require('cors');
const { connect } = require('./Mongo/');
const bodyParser = require('body-parser');
require("dotenv").config();
//#endregion

//#region We will define the objects we will use
const app = express();
//#endregion

//#region We will define the variables
const PORT = process.env.PORT;
//#endregion

//#region We will instantiate MongoDB and connect to the database
connect(( error ) => {
    if (error) return console.log(error);
})
//#endregion

//#region We will configure express
app.use(cors()); // We will allow Cross Origin Request.
app.use(express.json()); // We will use JSON
app.use(bodyParser.urlencoded({ extended: true })); // Fixes for understanding post requests
//#endregion

//#region We will define the routes for our API
const { AuthenticationRouter } = require('./routes');
//#endregion

//#region We will specify the routes for Express to make use of
app.use('/authentication', AuthenticationRouter);
//#endregion

//#region We will begin to broadcast the service over the port we defined in the .env
app.listen(PORT, function() {
    console.log(
        `
        Blog API is running on Port: ${PORT}
        `
        )
});
//#endregion