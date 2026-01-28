const url = 'https://api.themoviedb.org/3/discover/movie';
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmQyYWY3NGM4NDlmMmQxMjMwYTZmYTg2MzcwMzgyZiIsIm5iZiI6MTcwNDk4Nzg4NC4xOTI5OTk4LCJzdWIiOiI2NWEwMGNlY2YwNjQ3YzAxMmJhNDU3MDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.c8VeTnSBbCkhF-z1VeRMWcAbOXzQTvJCbl3-4cDziCk'
const imageUrl = 'https://image.tmdb.org/t/p/original';

const cardContainer = document.getElementById('container');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const pageText = document.getElementById('page');

let currentPage = 1;
let totalPages = 1;

const headers = {
    Authorization: `Bearer ${token}`
};

async function getMovies(page = 1) {
    const response = await fetch(`${url}?page=${page}`, { headers });

    if (!response.ok) {
        throw new Error('Error al cargar las peliculas');
    }

    return await response.json();
}

function render(movies) {
    cardContainer.innerHTML = "";

    movies.forEach(element => {
        const cardMovie = document.createElement("div");

        cardMovie.className = `
            p-4 bg-white border border-gray-200
            hover:-translate-y-1 transition duration-300
            rounded-lg shadow shadow-black/10
            max-w-80 h-[450px] flex flex-col
        `;

        cardMovie.innerHTML = `
            <img
              class="rounded-md h-40 w-full object-cover"
              src="${imageUrl}${element.poster_path}"
              alt="${element.title}"
            >

            <p class="text-gray-900 text-xl font-semibold mt-4">
              ${element.title}
            </p>

            <p class="text-zinc-400 text-sm mt-2 line-clamp-3">
              ${element.overview}
            </p>

            <button
              class="bg-indigo-600 hover:bg-indigo-700 transition
                     cursor-pointer mt-auto px-6 py-2
                     font-medium rounded-md text-white text-sm">
              Learn More
            </button>
        `;

        cardContainer.appendChild(cardMovie);
    });
}

async function loadPage(page) {
    const data = await getMovies(page);

    render(data.results);

    currentPage = data.page;
    totalPages = data.total_pages;

    pageText.textContent = `Página ${currentPage}`;

    btnPrev.disabled = currentPage === 1;
    btnNext.disabled = currentPage === totalPages;
}

// Eventos
btnNext.addEventListener('click', () => {
    if (currentPage < totalPages) {
        loadPage(currentPage + 1);
    }
});

btnPrev.addEventListener('click', () => {
    if (currentPage > 1) {
        loadPage(currentPage - 1);
    }
});

// Inicial
loadPage(1);
