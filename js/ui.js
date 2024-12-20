export function displayGames(list, onGameClick) {
    let blackBox = "";
    for (let i = 0; i < list.length; i++) {
        blackBox += `<div class="col-md-6 col-lg-4 col-xl-3 h-100">
            <div>
                <div class="card bg-transparent" id="${list[i].id}">
                    <div class="card-body">
                        <figure>
                            <img src="${list[i].thumbnail}" class="img-fluid w-100 h-100 rounded-2" alt="">
                        </figure>
                        <figcaption>
                            <div class="d-flex justify-content-between align-items-center">
                                <h2 class="h6">${list[i].title}</h2>
                                <span class="badge text-bg-primary p-2">free</span>
                            </div>
                            <p class="card-text text-center opacity-50 text-white m-0">${list[i].short_description}</p>
                        </figcaption>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <span class="badge badge-color">${list[i].genre}</span>
                        <span class="badge badge-color">${list[i].platform}</span>
                    </div>
                </div>
            </div>
        </div>`;
    }
    document.getElementById("rowGames").innerHTML = blackBox;

    document.getElementById("rowGames").addEventListener('click', function(e) {
        const card = e.target.closest('.card');
        if (card) {
            const gameId = card.id;
            if (gameId) {
                document.querySelector("main").classList.add("d-none");
                document.querySelector(".Details_Games").classList.remove("d-none");
                onGameClick(gameId);
            }
        }
    });
}

export function displayGameDetails(game) {
    const detailsHTML = `
        <div class="col-lg-4">
            <div class="game-image">
                <img src="${game.thumbnail}" class="w-100 rounded-2" alt="${game.title}">
            </div>
        </div>
        <div class="col-lg-8">
            <div class="game-info">
                <h4 class="mb-3">Title: ${game.title}</h4>
                <div class="mb-2">
                    <span class="text-white">Category: </span>
                    <span class="badge text-bg-info">${game.genre}</span>
                </div>
                <div class="mb-2">
                    <span class="text-white">Platform: </span>
                    <span class="badge text-bg-info">${game.platform}</span>
                </div>
                <div class="mb-2">
                    <span class="text-white">Status: </span>
                    <span class="badge text-bg-info">${game.status}</span>
                </div>
                <p class="mt-3 text-white-50">${game.description}</p>
                <a href="${game.game_url}" target="_blank" class="btn">
                    Play Game
                </a>
            </div>
        </div>
    `;
    document.getElementById("rowDetails").innerHTML = detailsHTML;
}
