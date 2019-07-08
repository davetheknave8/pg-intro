const express = require( 'express' );
const bodyParser = require( 'body-parser' );

// Get the database pool from module
const pool = require('./modules/pool')
// Setting up our express app
const app = express();
app.use(express.static('server/public'));
app.use( bodyParser.urlencoded({extended: true}));


//Routes will go here
app.get('/music', (req, res) => {
    // SQL to get all music (aka songs)
    const sqlText = 'SELECT * FROM "songs" ORDER BY "rank" DESC;';
    pool.query(sqlText)
        .then(response => {
        console.log('Got info from database', response);
        res.send(response.rows)
    })
        .catch( (error) => {
        console.log('Error getting music from db', error);
        res.sendStatus(5000);
    })
});

app.post('/music', (req, res) => {
    const newSong = req.body;
    console.log('Adding new song', newSong);

    const sqlText = `INSERT INTO "songs" ("rank", "track", "artist", "published")
    VALUES ($1, $2, $3, $4);`;
    const values = [Number(newSong.rank), newSong.track, newSong.artist, newSong.published];
    pool.query(sqlText, values)
        .then( (response) => {
            res.sendStatus(201);
        })
        .catch( (error) => {
            console.log('Error adding new song to db', error);
            res.sendStatus(500);
        })
})


// Start up the server
const port = process.env.port || 5000;
app.listen( port, () => {
    console.log(`Listening on port ${port}...`);
})

