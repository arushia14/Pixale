const auth = config.apikey;

const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const submitBtn = document.querySelector('.submit-btn');
const form = document.querySelector('.search-form');
const more = document.querySelector('.more');
let searchValue;
let page = 1;
let fetchLink;
let currentQuery;

searchInput.addEventListener('input', updateInput);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    currentQuery = searchValue;
    searchPhotos(searchValue);
})

more.addEventListener('click', loadMore);

async function loadMore() {
    page++;
    if (currentQuery) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentQuery}&per_page=15&page=${page}`;
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
}

function updateInput(e) {
    searchValue = e.target.value;
}

function clear() {
    gallery.innerHTML = '';
    searchInput.value = '';
}


async function fetchApi(url) {
    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();

    data.photos.forEach(photo => {
        const image = document.createElement('div');
        image.classList.add('gallery-img');
        image.innerHTML = ` 
        <div class='gallery-info'>
        <p>By ${photo.photographer}</p>
        <a href=${photo.src.original} target='_blank'>Download Original</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(image);
    })
}


async function curatedPhotos() {
    fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page=1';
    const dataFetch = await fetch(fetchLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();

    data.photos.forEach(photo => {
        const image = document.createElement('div');
        image.classList.add('gallery-img');
        image.innerHTML = ` 
        <div class='gallery-info'>
        <p>By ${photo.photographer}</p>
        <a href=${photo.src.original} target='_blank'>Download Original</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(image);
    })
}

async function searchPhotos(query) {
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15`
    const dataFetch = await fetch(fetchLink, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: auth
        }
    });
    const data = await dataFetch.json();

    data.photos.forEach(photo => {
        const image = document.createElement('div');
        image.classList.add('gallery-img');
        image.innerHTML = ` 
        <div class='gallery-info'>
        <p>By ${photo.photographer}</p>
        <a href=${photo.src.original} target='_blank'>Download Original</a>
        </div>
        <img src=${photo.src.large}></img>
        `;
        gallery.appendChild(image);
    })
}


curatedPhotos();