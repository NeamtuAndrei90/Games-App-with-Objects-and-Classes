function Game(id, title, description, imageUrl){
    this._id = id;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
}

Game.prototype.show = function(){
    var container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.setAttribute("id", this._id)
    gameELement.innerHTML = `<h1>${this.title}</h1> 
                            <img src="${this.imageUrl}" />
                            <p>${this.description}</p> 
                            <button class="delete-btn">Delete Game</button>
                            <button class="edit-btn">Edit Game</button>`;
    return container1.appendChild(gameELement);
}