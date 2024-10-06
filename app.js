import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as domScraper from './server/domScraper.js';
import Player from './server/player.js'
import helper from './server/helper.js'

const app = express();


app.set('view engine', 'pug'); // sets pug as the view engine
app.set('views', './client/views')
app.use(express.static('client/assets'))


const players = await helper.runTest();


app.get('/', async (req, res) => {
    try {
        const url = 'https://www.fut.gg/players/?page='
        //max page er 933

        players.sort((a, b) => b.overall - a.overall)
        // Render Pug view og send spillernavne
        res.render('fp', { players: players });
        res.end()
    } catch (error) {
        console.error('Der opstod en fejl:', error);
        res.status(500).send('Intern serverfejl');
    }
});

app.get('/:player', async (req, res) => {
    const itemID = req.params.player

    const player = players.find(player => player.itemID == itemID)

    res.render('playerPage', { player: player })
})



// If endpoint doesn't exist af 404 error is send.
app.get('/*', function (req, res) {
    console.log("404 error");
    // TODO
    // Actually make a page that shows an error code
    res.sendStatus(404);
})

app.listen(8080, () => console.log("Serveren kører på port 8080"));
