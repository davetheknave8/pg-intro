const express = require( 'express' );
const bodyParser = require( 'body-parser' );

// Get the database pool from module
const pool = require( './modules/pool' );

// Setting up our express app
const app = express();
app.use(express.static('server/public'));
app.use( bodyParser.urlencoded({extended: true}));


//Routes will go here
app.get('/music', (req, res) => {

})


// Start up the server
const port = process.env.port || 5000;
app.listen( port, () => {
    console.log(`Listening on port ${port}...`);
})

