import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as domScraper from './server/domScraper.js';
import Player from './server/player.js'

const app = express();


app.set('view engine', 'pug'); // sets pug as the view engine
app.set('views', './client/views')
app.use(express.static('client/assets'))


const players = []
const playerUrls = []

const url = 'https://www.fut.gg/players/?page='
for (let index = 1; index <= 100; index++) {
    await getPlayerURLs(`${url}${index}`)
};
playerUrls.forEach(url => getPlayerName(url));



app.get('/', async (req, res) => {
    try {
        const url = 'https://www.fut.gg/players/?page='
        //max page er 933

        players.sort((a, b) => b.overall - a.overall)
        // Render Pug view og send spillernavne
        res.render('fp', {players: players});
    } catch (error) {
        console.error('Der opstod en fejl:', error);
        res.status(500).send('Intern serverfejl');
    }
});

app.get('/:player', async (req, res) => {
    const itemID = req.params.player

    const player = players.find(player => player.itemID == itemID)

    res.render('playerPage', {player: player})
    res.end()
})


// If endpoint doesn't exist af 404 error is send.
app.get('/*', function(req, res) {
    console.log("404 error");
    // TODO
    // Actually make a page that shows an error code
    res.sendStatus(404);
})


async function getPlayerURLs(url) {
    try {
        const response = await axios.get(url);

        const html = response.data;

        const $ = cheerio.load(html);
        const body = $('body div.flex-1 main.global-content div.container div.grid div div.bg-dark-gray')

        body.find('div.-my-3').each((index, element) => {
            const linkElement = $(element).find('a');

            const href = linkElement.attr('href');
            const playerUrl = `https://www.fut.gg${href}`;
            //console.log(`Player #${index}: URL -  ${playerUrl}`);
            console.log(url);
            playerUrls.push(playerUrl)
        })

    } catch (error) {
        console.error('Der opstod en fejl:', error);
        //res.status(500).send('Intern serverfejl');
    }

    return playerUrls
}



async function getPlayerName(playerUrl) {
    try {
        const response = await axios.get(playerUrl);

        const html = response.data
        const $ = cheerio.load(html);
        
        
        const playerNameShort = domScraper.getPlayerNameShort($)
        const playerNameFull = domScraper.getPlayerNameFull($)
        const overall = domScraper.getOverallRating($)
        const club = domScraper.getClub($)
        const nationality = domScraper.getNationality($)
        const league = domScraper.getLeague($)
        const foot = domScraper.getFoot($)
        const sm = domScraper.getSkillMoves($)
        const wf = domScraper.getWeakFoot($)
        const accelerate = domScraper.getAcceleRATE($)
        const height = domScraper.getHeight($)
        const weight = domScraper.getWeight($)
        const bodyType = domScraper.getBodyType($)
        const age = domScraper.getAge($)
        const playerID = domScraper.getPlayerID($)
        const itemID = domScraper.getItemID($)
        const addedOn = domScraper.getAddedOn($)



        const player = new Player(playerNameShort, playerNameFull, overall, club, 
            nationality, league, foot, sm, wf, accelerate, height, weight, bodyType, 
            age, playerID, itemID, addedOn, playerUrl)
        players.push(player);



        console.log(`
            Name: ${playerNameShort} (${playerNameFull})
            Overall: ${overall}
            Club: ${club}
            Nationality: ${nationality}
            League: ${league}
            
            Foot: ${foot}
            SM: ${sm}
            WF: ${wf}
            AcceleRATE: ${accelerate}
            Height: ${height}
            Weight: ${weight}
            Body Type: ${bodyType}
            Age: ${age}
            
            Player ID: ${playerID}
            Item ID: ${itemID}
            Added On: ${addedOn}
            `);
            
        
        //console.log(`${playerName} plays for ${club} in $and is from ${nationality}`);
        

    } catch (error) {
        console.error('Der opstod en fejl ved hentning af spillernavn:', error);
        //res.status(500).send('Intern serverfejl');
    }
}


app.listen(8080, () => console.log("Serveren kører på port 8080"));
