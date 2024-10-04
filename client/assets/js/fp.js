// Lav en eventListener som er på hver spillers navn og som laver en get-request til spillerens playerPage


// GET request der giver front-end adgang til

document.addEventListener('DOMContentLoaded', () => {
    const playerNames = document.querySelectorAll('.playerName')

    playerNames.forEach(element => {
        element.addEventListener('click', (event) => {
            const playerName = element.textContent;
            const playerItemID = element.getAttribute('playerItemID');

            console.log(`${playerName} har ID: ${playerItemID}`);

            getPlayerPage(playerItemID);
        });
    });
});


async function getPlayerPage(playerItemID) {
    const response = await fetch(`http://localhost:8080/${playerItemID}`)

    if (!response.ok) console.error('Fejl! kunne ikke fetch');

    window.open(`/${playerItemID}`, '_blank')
}