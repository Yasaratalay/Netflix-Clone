const nav = document.querySelector(".navbar");
const searchInput = document.querySelector(".searchInput");

const initialiseApp = () => {
    initialiseMovies();
    initialiseCategories();
}

const initialiseMovies = () => {
    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(response => setMovies(response));
}

setMovies = (response) => {
    if (response) {
        let originalElm = $("#originals");
        originalElm.children().remove();

        _.each(response, function (movie) {
            originalElm.append(`<img src="${movie.thumbnail}" alt="${movie.name}" class="img_Large">`)
        })
    }
}

const initialiseCategories = () => {
    fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(response => console.log(response));
}

$("input[name='search']").on("keydown", _.debounce(function (e) {
    if (this.value) {
        fetch("http://localhost:3000/movies?name_like=" + this.value)
            .then(response => response.json())
            .then(response => setMovies(response))
    } else {
        initialiseMovies();
    }
}, 500));

window.addEventListener("scroll", scrollActive);

function scrollActive(e) {
    if (window.scrollY >= 100) {
        nav.classList.add("navBlack");
    } else {
        nav.classList.remove("navBlack");
    }
}

$('#exampleModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let recipient = button.data('whatever');
    let modal = $(this);
    modal.find('.modal-title').text('New message to ' + recipient);
    modal.find('.modal-body input').val(recipient);
})

initialiseApp();