const apiUrl = new FetchApi('https://games-app-siit.herokuapp.com');

async function displayGames(){
    const arrayOfGames = await apiUrl.getGamesList();
    const gameContainer = document.querySelector('.container')
    for(var i = 0; i < arrayOfGames.length; i++) {
        const game = new Game(arrayOfGames[i]._id, arrayOfGames[i].title, arrayOfGames[i].description, arrayOfGames[i].imageUrl);
        const gameDiv = game.show();
        gameContainer.appendChild(gameDiv);
    }
}
displayGames()