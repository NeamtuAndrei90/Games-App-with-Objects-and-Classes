function createGameForm(title, releaseDate, genre, publisher, imageUrl, description) {
    this.title = title;
    this.releaseDate = releaseDate;
    this.genre = genre;
    this.publisher = publisher;
    this.imageUrl = imageUrl;
    this.description = description;
}

createGameForm.prototype.validateFormElement = function(inputElement, errorMessage) {
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    } 
}

createGameForm.prototype.validateReleaseTimestampElement = function (inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

createGameForm.prototype.buildErrorMessage = function (inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}

createGameForm.prototype.displayCreatedGame = function(request) {
    const gameELement = document.createElement("div");
    gameELement.setAttribute("id", `${request._id}`)
    gameELement.setAttribute('class', 'gameELement')
    gameELement.innerHTML = `<h1>${request.title}</h1> 
                            <img src="${request.imageUrl}" />
                            <p>${request.description}</p> 
                            <button class="delete-btn">Delete Game</button>
                            <button class="edit-btn">Edit Game</button>`;

    return gameELement;
}