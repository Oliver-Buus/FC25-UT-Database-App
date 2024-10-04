


function getPlayerNameShort(cheerioLoadedHTML) {

    const playerName = cheerioLoadedHTML('h1.font-bold.text-3xl.md\\:text-4xl')
    .clone()
    .find('span')
    .remove()
    .end()
    .text()
    .trim();
    return playerName
}

function getPlayerNameFull(cheerioLoadedHTML) {

    // Find where the name is located in the html-file
    const nameRow = cheerioLoadedHTML('div.flex.justify-between')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Name'
    });

    if(nameRow.length > 0) {
        return nameRow.children().eq(1).text().trim();
    }
}

function getOverallRating(cheerioLoadedHTML) {

    let ovr = cheerioLoadedHTML('span.text-lighter-gray.font-bold.hidden.md\\:inline-block.text-base.ml-2')
    .text()
    .trim()

    return ovr.split(' ')[0]
}

function getClub(cheerioLoadedHTML) {
    const clubRow = cheerioLoadedHTML('div.flex.justify-between.flex-row.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Club'
    });


    if (clubRow.length > 0) {
        const clubContainer = clubRow.children().eq(1);
        const clubLink = clubContainer.find('a')
        const clubName = clubLink.text().trim();

        return clubName;
    }

    return null;
}

function getNationality(cheerioLoadedHTML) {
    const nationRow = cheerioLoadedHTML('div.flex.justify-between.flex-row.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Nation'
    });

    if (nationRow.length > 0) {
        const nationContainer = nationRow.children().eq(1);
        const nationLink = nationContainer.find('a')
        const nation = nationLink.text().trim();

        return nation;
    }
}

function getLeague(cheerioLoadedHTML) {
    const leagueRow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'League'
    });

    if (leagueRow.length > 0) {
        const leagueContainer = leagueRow.children().eq(1);
        const leagueLink = leagueContainer.find('a')
        const league = leagueLink.text().trim();

        return league;
    }
}

function getFoot(cheerioLoadedHTML) {

    const footRow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Foot'
    });

    if(footRow.length > 0) {
        return footRow.children().eq(1).text().trim();
    }
}

function getSkillMoves(cheerioLoadedHTML) {

    const skillMovesRow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Skill Moves'
    });

    if(skillMovesRow.length > 0) {
        const skillMovesContainer = skillMovesRow.children().eq(1)
        const skillMovesSpanRemoved = skillMovesContainer.clone().children().remove().end()
        const skillMoves = skillMovesSpanRemoved.text().trim()
        return skillMoves
    }
}

function getWeakFoot(cheerioLoadedHTML) {

    const weakFootRow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Weak Foot'
    });

    if(weakFootRow.length > 0) {
        const weakFootContainer = weakFootRow.children().eq(1)
        const weakFootSpanRemoved = weakFootContainer.clone().children().remove().end()
        const weakFoot = weakFootSpanRemoved.text().trim()
        return weakFoot
    }
}

function getAcceleRATE(cheerioLoadedHTML) {

    const AcceleRATERow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'AcceleRATE'
    });

    if(AcceleRATERow.length > 0) {
        return AcceleRATERow.children().eq(1).text().trim();
    }
}

function getHeight(cheerioLoadedHTML) {

    const heightRow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Height'
    });

    if(heightRow.length > 0) {
        const heightContainer = heightRow.children().eq(1).clone()
        const heightMetricOnly = heightContainer.text().split('|')[0].trim()
        return heightMetricOnly
    }
}

function getWeight(cheerioLoadedHTML) {

    const weightRow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Weight'
    });

    if(weightRow.length > 0) {
        const weightContainer = weightRow.children().eq(1).clone()
        const weightMetricOnly = weightContainer.text().split('|')[0].trim()
        return weightMetricOnly
    }
}

function getBodyType(cheerioLoadedHTML) {
    const bodyTypeRow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Body Type'
    });

    if(bodyTypeRow.length > 0) {
        return bodyTypeRow.children().eq(1).text().trim();
    }
}

function getAge(cheerioLoadedHTML) {
    const ageRow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Age'
    });

    if(ageRow.length > 0) {
        return ageRow.children().eq(1).text().trim();
    }
}

function getPlayerID(cheerioLoadedHTML) {
    const playerIDRow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Player ID'
    });

    if(playerIDRow.length > 0) {
        return playerIDRow.children().eq(1).text().trim();
    }
}

function getItemID(cheerioLoadedHTML) {
    const itemIDRow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Item ID'
    });

    if(itemIDRow.length > 0) {
    return itemIDRow.children().eq(1).text().trim();
    }
}

function getAddedOn(cheerioLoadedHTML) {
    const addedOnRow = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .filter((index, element) => {
        return cheerioLoadedHTML(element).children().eq(0).text().trim() === 'Added on'
    });

    if(addedOnRow.length > 0) {
    return addedOnRow.children().eq(1).text().trim();
    }
}

export { getPlayerNameShort, getPlayerNameFull, getOverallRating, getClub, getNationality, getLeague, getFoot, 
    getSkillMoves, getWeakFoot, getAcceleRATE, getHeight, getWeight, getBodyType, getAge, getPlayerID, getItemID, getAddedOn }