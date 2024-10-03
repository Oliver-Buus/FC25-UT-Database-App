


function getPlayerNameShort(cheerioLoadedHTML) {
    //TODO error handling

    const playerNameShort = cheerioLoadedHTML('div.flex-1')        
    .find('div.container')
    .eq(3)
    .find('h1')
    .clone()
    .find('span').remove()
    .end()
    .text()
    .trim()

    return playerNameShort
}

function getPlayerNameFull(cheerioLoadedHTML) {
    //TODO error handling

    const infoBlock = cheerioLoadedHTML('div.paper.mb-3.hidden.md\\:block')
    const playerNameFull = infoBlock
    .find('div.flex.justify-between')
    .eq(0)
    .find('div:last-child').text().trim();

    return playerNameFull
}

function getOverallRating(cheerioLoadedHTML) {

    let overall = cheerioLoadedHTML('div.flex-1')        
    .find('div.container')
    .eq(3)
    .find('h1')
    .find('span')
    .text()
    .trim()

    overall = overall.split(' ')[0]

    return overall
}

function getClub(cheerioLoadedHTML) {
    //TODO error handling

    // HERO-kort har ingen klub, så skal håndteres anderledes.

    const infoBlock = cheerioLoadedHTML('div.paper.mb-3.hidden.md\\:block')
    const club = infoBlock
    .find('div.flex.justify-between.flex-row.mt-2')
    .eq(0)
    .find('a')
    .text()
    .trim()

    return club
}

function getNationality(cheerioLoadedHTML) {
    //TODO error handling
    const infoBlock = cheerioLoadedHTML('div.paper.mb-3.hidden.md\\:block')
    const nationality = infoBlock
    .find('div.flex.justify-between.flex-row.mt-2')
    .eq(1)
    .find('a')
    .text()
    .trim()

    return nationality

}

function getLeague(cheerioLoadedHTML) {
    // TODO error handling

    const infoBlock = cheerioLoadedHTML('div.paper.mb-3.hidden.md\\:block')
    const league = infoBlock
    .find('div.flex.justify-between.mt-2')
    .eq(2)
    .find('a')
    .text()
    .trim()

    return league
}

function getFoot(cheerioLoadedHTML) {
    // TODO error handling

    const foot = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .eq(3)
    .children()
    .eq(1)
    .text()
    .trim()

    return foot
}

function getSkillMoves(cheerioLoadedHTML) {

    const skillMoves = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .eq(4)
    .children()
    .eq(1)
    .clone()
    .find('span').remove()
    .end()
    .text()
    .trim()

    return skillMoves

}

function getWeakFoot(cheerioLoadedHTML) {

    const weakFoot = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .eq(5)
    .children()
    .eq(1)
    .clone()
    .find('span').remove()
    .end()
    .text()
    .trim()

    return weakFoot
}

function getAcceleRATE(cheerioLoadedHTML) {

    const accelerate = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .eq(6)
    .children()
    .eq(1)
    .text()
    .trim()

    return accelerate

}

function getHeight(cheerioLoadedHTML) {

    const height = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .eq(7)
    .children()
    .eq(1)
    .text()
    .trim()

    return height


}

function getWeight(cheerioLoadedHTML) {

    const weight = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .eq(8)
    .children()
    .eq(1)
    .text()
    .trim()

    return weight
}

function getBodyType(cheerioLoadedHTML) {
    const bodyType = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .eq(9)
    .children()
    .eq(1)
    .text()
    .trim()

    return bodyType
}

function getAge(cheerioLoadedHTML) {
    const age = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .eq(10)
    .children()
    .eq(1)
    .text()
    .trim()

    return age
}

function getPlayerID(cheerioLoadedHTML) {
    const playerID = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .eq(11)
    .children()
    .eq(1)
    .text()
    .trim()

    return playerID
}

function getItemID(cheerioLoadedHTML) {
    const itemID = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .eq(12)
    .children()
    .eq(1)
    .text()
    .trim()

    return itemID
}

function getAddedOn(cheerioLoadedHTML) {
    const addedOn = cheerioLoadedHTML('div.flex.justify-between.mt-2')
    .eq(13)
    .children()
    .eq(1)
    .text()
    .trim()

    return addedOn
}

export { getPlayerNameShort, getPlayerNameFull, getOverallRating, getClub, getNationality, getLeague, getFoot, 
    getSkillMoves, getWeakFoot, getAcceleRATE, getHeight, getWeight, getBodyType, getAge, getPlayerID, getItemID, getAddedOn }