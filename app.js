import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();


app.set('view engine', 'pug'); // sets pug as the view engine
app.set('views', './client/views')

const playerUrls = []
const playerNames = []
const players = []

const url = 'https://www.fut.gg/players/?page='
for (let index = 1; index <= 10; index++) {
    await getPlayerURLs(`${url}${index}`)
}

playerUrls.forEach(url => getPlayerName(url));

app.get('/', async (req, res) => {
    try {
        const url = 'https://www.fut.gg/players/?page='
        //max page er 933

        // Render Pug view og send spillernavne
        res.render('fp', {playerUrls, playerNames, players});
    } catch (error) {
        console.error('Der opstod en fejl:', error);
        res.status(500).send('Intern serverfejl');
    }
});

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
        const h1Element = $('div.container div div div div.mt-2 div h1').clone();
        h1Element.find('span').remove();
        const playerName = h1Element.text().trim();

        //console.log(playerName);
        playerNames.push(playerName)
        players.push({playerName, playerUrl });
    } catch (error) {
        console.error('Der opstod en fejl ved hentning af spillernavn:', error);
        //res.status(500).send('Intern serverfejl');
    }
}

// If endpoint doesn't exist af 404 error is send.
app.get('/*', function(req, res) {
    console.log("404 error");
    // TODO
    // Actually make a page that shows an error code
    res.sendStatus(404);
})


app.listen(8080, () => console.log("Serveren kører på port 8080"));






