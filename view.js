const apiUrl = new FetchApi('https://games-app-siit.herokuapp.com');

async function displayGames(){
    const arrayOfGames = await apiUrl.getGamesList();
    const gameContainer = document.querySelector('.container')
    for(var i = 0; i < arrayOfGames.length; i++) {
        const game = new Game(arrayOfGames[i]._id, arrayOfGames[i].title, arrayOfGames[i].description, arrayOfGames[i].imageUrl);
        const gameDiv = game.show();
        gameContainer.appendChild(gameDiv);

        document.getElementById(`${game._id}`).addEventListener("click", async function(){
        if(event.target.classList.contains('delete-btn')){
            const gameDiv = event.target.parentElement;
            const delGame = await apiUrl.deleteGame(gameDiv.getAttribute('id'));
            console.log(apiUrl);
            removeDeletedElementFromDOM(document.querySelector('.gameELement'));
        } else if(event.target.classList.contains('edit-btn')){
            newDomElement((event.target.parentElement));
        }
    })
    }
    function newDomElement(gameContainer){
        const gameTitle = gameContainer.querySelector('h1');
        const gameDescription = gameContainer.querySelector('p');
        const gameImageURL = gameContainer.querySelector('img');
        const updateGameElement = document.createElement('form');
        updateGameElement.classList.add('updateForm')
        updateGameElement.innerHTML = `<label for="newGameTitle">Title *</label>
                                    <input type="text" value="${gameTitle.textContent}" name="newGameTitle" id="newGameTitle" />
                                    <label for="newGameDescription">Description</label>
                                    <textarea name="newGameDescription" id="newGameDescription">${gameDescription.textContent}</textarea>
                                    <label for="newGameImageUrl">Image URL *</label>
                                    <input type="text" name="newGameImageUrl" id="newGameImageUrl" value="${gameImageURL.src}"/>
                                    <button class="updateBtn">Save Changes</button>
                                    <button class="cancelBtn">Cancel</button>`;
        gameContainer.appendChild(updateGameElement);
        gameContainer.querySelector('.cancelBtn').addEventListener('click', function(event){
            event.preventDefault();
            removeDeletedElementFromDOM(updateGameElement);
        });

        gameContainer.querySelector('.updateBtn').addEventListener('click', function(){
            const updatedGameTitle = document.querySelector('#newGameTitle');
            const updatedGameDescription = document.querySelector('#newGameDescription');
            const updatedGameImageUrl = document.querySelector('#newGameImageUrl');

            const urlencoded = new URLSearchParams();
            urlencoded.append("title", updatedGameTitle.value);
            urlencoded.append("description", updatedGameDescription.value);
            urlencoded.append("imageUrl", updatedGameImageUrl.value);
            
            removeDeletedElementFromDOM(updateGameElement);
            (async function(){
                const gameEditor = await apiUrl.updateGameRequest(gameContainer.id, urlencoded);
                return gameEditor;
            })();
        })
            
    }
    
};
displayGames()

function removeDeletedElementFromDOM(domElement){
    domElement.remove();
};

document.querySelector(".submitBtn").addEventListener("click", function(event){
    event.preventDefault();
    const newGame = new CreateGameForm(document.getElementById("gameTitle"),
                                        document.getElementById("gameDescription"),
                                        document.getElementById("gameGenre"),
                                        document.getElementById("gamePublisher"),
                                        document.getElementById("gameImageUrl"),
                                        document.getElementById("gameRelease"));


    newGame.validateFormElement(newGame.gameTitle, "The title is required!");
    newGame.validateFormElement(newGame.gameGenre, "The genre is required!");
    newGame.validateFormElement(newGame.gameImageUrl, "The image URL is required!");
    newGame.validateFormElement(newGame.gameRelease, "The release date is required!");

    newGame.validateReleaseTimestampElement(newGame.gameRelease, "The release date you provided is not a valid timestamp!");

    if(newGame.gameTitle.value !== "" && newGame.gameGenre.value !== "" && newGame.gameImageUrl.value !== "" && newGame.gameRelease.value !== "") {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", newGame.gameTitle.value);
        urlencoded.append("releaseDate", newGame.gameRelease.value);
        urlencoded.append("genre", newGame.gameGenre.value);
        urlencoded.append("publisher", newGame.gamePublisher.value);
        urlencoded.append("imageUrl", newGame.gameImageUrl.value);
        urlencoded.append("description", newGame.gameDescription.value);

       (async function createGame(){
           const request = await apiUrl.createGameRequest(urlencoded)
           console.log(request);
           const newGameDom = newGame.displayCreatedGame(request);
           document.querySelector('.container').appendChild(newGameDom);
       })
    }
})