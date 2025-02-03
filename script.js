const searchInput = document.getElementById('search_input');
const resultArtist = document.getElementById('result_artist');
const resultPlaylist = document.getElementById('result_playlists');

function requestApi (searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result, searchTerm))
}

function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden");

    const gridContainer = document.querySelector('.grid_container');
    gridContainer.innerHTML=''; //Limpa as buscas anteriores

    const filteredArtists = result.filter(artist => artist.name.toLowerCase().includes(searchTerm));

    filteredArtists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist_card');

        artistCard.innerHTML = `
            <div class="card_img">
                <img class="artist_img" src="${artist.urlImg}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card_text">
                <span clas="artist_name">${artist.name}</span>
                <span class="artist_categorie">Artista</span>
            </div>
        `;
        gridContainer.appendChild(artistCard)
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === ''){
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});