const API_BASE_URL = 'http://localhost:8080/api/movies';

$(document).ready(function() {
    
    // Navbar scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.cineverse-nav').addClass('scrolled');
        } else {
            $('.cineverse-nav').removeClass('scrolled');
        }
    });

    // Determine current page and initialize
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') {
        initHomePage();
    } else if (path.includes('movies.html')) {
        initMoviesPage();
    } else if (path.includes('movie-details.html')) {
        // init is called inline from movie-details.html
    } else if (path.includes('admin.html')) {
        // init inline
    }

    // Search functionality
    $('#searchInput').on('input', function() {
        const query = $(this).val().toLowerCase();
        if (query.length > 2) {
            searchMovies(query);
        } else {
            $('#searchResults').addClass('d-none').empty();
        }
    });

    $(document).click(function(e) {
        if (!$(e.target).closest('.search-box').length) {
            $('#searchResults').addClass('d-none');
        }
    });
});

function showLoader() { $('#loader').removeClass('d-none'); }
function hideLoader() { $('#loader').addClass('d-none'); }

// --- Home Page Functions ---
function initHomePage() {
    showLoader();
    $.get(API_BASE_URL, function(movies) {
        if(movies.length > 0) {
            setupHeroBanner(movies[0]); // First movie as hero
            
            // Group by category
            const categories = {};
            movies.forEach(movie => {
                if(!categories[movie.category]) {
                    categories[movie.category] = [];
                }
                categories[movie.category].push(movie);
            });

            const container = $('#movieRowsContainer');
            container.empty();

            for (const [category, catMovies] of Object.entries(categories)) {
                
                let rowHtml = `<h2 class="movie-row-title">${category}</h2><div class="movie-row">`;
                catMovies.forEach(m => {
                    rowHtml += `
                        <div class="movie-card" onclick="window.location.href='/movie-details.html?id=${m.id}'">
                            <img src="${m.posterURL}" alt="${m.title}">
                            <div class="movie-card-info">
                                <h6>${m.title}</h6>
                                <p class="text-success mb-0 fw-bold">${m.rating} Rating</p>
                                <small>${m.genre} • ${m.releaseYear}</small>
                            </div>
                        </div>
                    `;
                });
                rowHtml += `</div>`;
                container.append(rowHtml);
            }
        }
        hideLoader();
    }).fail(function() {
        hideLoader();
        console.error("Failed to load movies");
    });
}

function setupHeroBanner(movie) {
    $('#heroTitle').text(movie.title);
    $('#heroDesc').text(movie.description);
    // Note: in a real app, use a wide backdrop URL, but we use poster URL for now
    $('#heroBanner').css('background-image', `url(${movie.posterURL})`);
    
    // Add click to More Info
    $('.btn-more-info').off('click').on('click', function() {
        window.location.href = `/movie-details.html?id=${movie.id}`;
    });
}

// --- Movies Grid Page ---
let allMoviesCache = [];

function fetchAndRenderMoviesGrid() {
    showLoader();
    $.get(API_BASE_URL, function(movies) {
        allMoviesCache = movies;
        renderMoviesGrid(movies);
        
        // Populate genres for filter
        const genres = [...new Set(movies.map(m => m.genre))];
        const filter = $('#genreFilter');
        filter.empty().append('<option value="">All Genres</option>');
        genres.forEach(g => {
            filter.append(`<option value="${g}">${g}</option>`);
        });

        hideLoader();
    });

    $('#genreFilter').change(function() {
        const selected = $(this).val();
        if(selected) {
            renderMoviesGrid(allMoviesCache.filter(m => m.genre === selected));
        } else {
            renderMoviesGrid(allMoviesCache);
        }
    });
}

function renderMoviesGrid(movies) {
    const grid = $('#moviesGrid');
    grid.empty();
    movies.forEach(m => {
        grid.append(`
            <div class="col-6 col-md-4 col-lg-3 col-xl-2">
                <div class="card bg-dark text-white movie-grid-card h-100" onclick="window.location.href='/movie-details.html?id=${m.id}'">
                    <img src="${m.posterURL}" class="card-img-top" alt="${m.title}">
                    <div class="card-body p-2">
                        <h6 class="card-title text-truncate mb-1">${m.title}</h6>
                        <small class="text-muted">${m.releaseYear} • ${m.genre}</small>
                    </div>
                </div>
            </div>
        `);
    });
}

// --- Movie Details Page ---
function fetchMovieDetails(id) {
    showLoader();
    $.get(`${API_BASE_URL}/${id}`, function(movie) {
        let html = `
            <div class="row">
                <div class="col-md-4 mb-4">
                    <img src="${movie.posterURL}" class="img-fluid rounded shadow-lg" alt="${movie.title}">
                </div>
                <div class="col-md-8">
                    <h1 class="display-4 fw-bold">${movie.title}</h1>
                    <p class="text-muted fs-5">${movie.releaseYear} | <span class="badge bg-secondary">${movie.genre}</span> | <span class="text-success fw-bold"><i class="fas fa-star text-warning"></i> ${movie.rating}</span></p>
                    <p class="fs-5 mt-4 text-light">${movie.description}</p>
                    
                    <div class="mt-4">
                        <p><strong>Director:</strong> ${movie.director || 'N/A'}</p>
                        <p><strong>Cast:</strong> ${movie.castMembers || 'N/A'}</p>
                    </div>
                    
                    <div class="mt-5">
                        <button class="btn btn-danger btn-lg me-3" onclick="playTrailer('${movie.trailerURL}')">
                            <i class="fas fa-play me-2"></i> Play Trailer
                        </button>
                        <button class="btn btn-outline-light btn-lg">
                            <i class="fas fa-plus me-2"></i> My List
                        </button>
                    </div>
                </div>
            </div>
        `;
        $('#movieDetailContainer').html(html);
        hideLoader();
    });
}

function playTrailer(url) {
    $('#trailerIframe').attr('src', url + "?autoplay=1");
    $('#trailerModal').modal('show');
}

$('#trailerModal').on('hidden.bs.modal', function () {
    $('#trailerIframe').attr('src', '');
});

// --- Search functionality ---
function searchMovies(query) {
    $.get(API_BASE_URL, function(movies) {
        const results = movies.filter(m => m.title.toLowerCase().includes(query));
        const resultsContainer = $('#searchResults');
        resultsContainer.empty();
        
        if(results.length > 0) {
            results.forEach(m => {
                resultsContainer.append(`
                    <a href="/movie-details.html?id=${m.id}" class="search-result-item">
                        <img src="${m.posterURL}" alt="${m.title}">
                        <div>
                            <h6 class="mb-1">${m.title}</h6>
                            <small class="text-muted">${m.releaseYear}</small>
                        </div>
                    </a>
                `);
            });
            resultsContainer.removeClass('d-none');
        } else {
            resultsContainer.append('<div class="p-3 text-muted">No movies found</div>');
            resultsContainer.removeClass('d-none');
        }
    });
}

// --- Admin Functions ---
function fetchAdminMovies() {
    $.get(API_BASE_URL, function(movies) {
        const tbody = $('#adminMoviesTable');
        tbody.empty();
        movies.forEach(m => {
            tbody.append(`
                <tr>
                    <td>${m.id}</td>
                    <td><img src="${m.posterURL}" width="40" height="60" style="object-fit:cover; border-radius:4px;"></td>
                    <td>${m.title}</td>
                    <td>${m.category}</td>
                    <td>${m.genre}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editMovie(${m.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deleteMovie(${m.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `);
        });
    });
}

function openAddMovieModal() {
    $('#movieForm')[0].reset();
    $('#movieId').val('');
    $('#modalTitle').text('Add Movie');
    $('#movieFormModal').modal('show');
}

function editMovie(id) {
    $.get(`${API_BASE_URL}/${id}`, function(movie) {
        $('#movieId').val(movie.id);
        $('#movieTitle').val(movie.title);
        $('#movieCategory').val(movie.category);
        $('#movieGenre').val(movie.genre);
        $('#movieYear').val(movie.releaseYear);
        $('#movieRating').val(movie.rating);
        $('#movieDesc').val(movie.description);
        $('#moviePoster').val(movie.posterURL);
        $('#movieTrailer').val(movie.trailerURL);
        $('#movieDirector').val(movie.director);
        $('#movieCast').val(movie.castMembers);
        
        $('#modalTitle').text('Edit Movie');
        $('#movieFormModal').modal('show');
    });
}

function saveMovie() {
    const id = $('#movieId').val();
    const movieData = {
        title: $('#movieTitle').val(),
        category: $('#movieCategory').val(),
        genre: $('#movieGenre').val(),
        releaseYear: $('#movieYear').val(),
        rating: $('#movieRating').val(),
        description: $('#movieDesc').val(),
        posterURL: $('#moviePoster').val(),
        trailerURL: $('#movieTrailer').val(),
        director: $('#movieDirector').val(),
        castMembers: $('#movieCast').val()
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE_URL}/${id}` : API_BASE_URL;

    $.ajax({
        url: url,
        type: method,
        contentType: 'application/json',
        data: JSON.stringify(movieData),
        success: function() {
            $('#movieFormModal').modal('hide');
            fetchAdminMovies();
        }
    });
}

function deleteMovie(id) {
    if(confirm('Are you sure you want to delete this movie?')) {
        $.ajax({
            url: `${API_BASE_URL}/${id}`,
            type: 'DELETE',
            success: function() {
                fetchAdminMovies();
            }
        });
    }
}
