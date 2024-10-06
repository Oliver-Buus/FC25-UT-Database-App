import axios from 'axios';
import * as cheerio from 'cheerio';
import * as domScraper from './domScraper.js';
import Player from './player.js'


const players = []
const playerUrls = []


async function runTest() {
    const url = 'https://www.fut.gg/players/?page='
    for (let index = 1; index <= 50; index++) {
        await getPlayerURLs(`${url}${index}`)
    };


    playerUrls.forEach(url => {
        getPlayerName(url)
    });

    return players
}



async function getPlayerURLs(url) {
    try {

        const html = await makeRequestWithRetry(url);

        const $ = cheerio.load(html);
        const body = $('body div.flex-1 main.global-content div.container div.grid div div.bg-dark-gray')

        body.find('div.-my-3').each((index, element) => {
            const linkElement = $(element).find('a');

            const href = linkElement.attr('href');
            const playerUrl = `https://www.fut.gg${href}`;
            //console.log(`Player #${index}: URL -  ${playerUrl}`);
            //console.log(url);
            playerUrls.push(playerUrl)
        })

    } catch (error) {

        if (error.code === 'ECONNRESET') {
            console.log('Connection reset, retrying');
        }
        console.error('Der opstod en fejl:', error);
        //res.status(500).send('Intern serverfejl');
    }

    return playerUrls
}


async function getPlayerName(playerUrl) {

    try {

        const html = await makeRequestWithRetry(playerUrl)
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
            age, playerID, itemID, addedOn, playerUrl);


        console.log(player.name);
        players.push(player);

        /*
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
            */


        //console.log(`${playerName} plays for ${club} in $and is from ${nationality}`);


    } catch (error) {
        console.error('Der opstod en fejl ved hentning af spillerdata:', error);
        //res.status(500).send('Intern serverfejl');
    }
}

async function makeRequestWithRetry(url, maxRetries = 10) {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            if (error.code === 'ECONNRESET') {
                console.log('Connection reset, retrying...');
                retries++;
            } else {
                throw error;
            }
        }
    }
    throw new Error(`Failed to establish connection after ${maxRetries} retries.`);
}

export default { runTest }