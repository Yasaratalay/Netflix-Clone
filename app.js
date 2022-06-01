const initialApp = () => {
    let fileName; // dosyanın uzantısını alıyoruz.
    let deleteFilm;
    const nav = document.querySelector(".navbar");
    window.addEventListener("scroll", scrollActive);

    function scrollActive(e) {
        if (window.scrollY >= 100) {
            nav.classList.add("navBlack");
        } else {
            nav.classList.remove("navBlack");
        }
    }

    handleMovies();

}

const handleMovies = () => {
    fetch("http://localhost:3000/movies")
        .then(response => response.json())
        .then(response => {
            setMovies(response);
        });
}
const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            timeout = null;

            func(...args);
        };
        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
    };
};

const modalToggle = () => $(".staticBackdrop").modal("toggle");


// Update - Insert - Delete İşlemleri
const setMovies = (movies) => {
    let originalMovie = $("#originals");
    let deleteMovieFromList = $("#deleteSearchList");

    originalMovie.children().remove();
    deleteMovieFromList.children().remove();

    // <option value="1">Korku</option>
    _.each(movies, function (movie) {
        originalMovie.append(`<img src="${movie.thumbnail}" alt="${movie.name}" data-movieid=${movie.id} class="img_Large">`)
        deleteMovieFromList.append(`<option value="${movie.id}">${movie.name}</option>`)
    })

    $(".searchInput").on("keydown", debounce((e) => {
        fetch(`http://localhost:3000/movies?name_like=${e.target.value}`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(response => setMovies(response))
            .catch(err => console.log("Search Error!"));
    }, 500));

}

// Seçilen fotoğrafın yolu.
$('input[type="file"]').change(function (e) {
    fileName = e.target.files[0].name;
    $(e.target).parent('div').find('.form-file-text').html(fileName)
    fileName = "images/" + fileName;
});


$("#confirmMovie").click(() => {
    let movieName = document.querySelector("#movieName").value;
    let movieCategory = $('#movieCategory :selected').text();

    if (movieName != "" && movieCategory != "Choose Movie...") {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'success',
            title: 'Film eklendi.'
        })
        setTimeout(() => {
            fetch('http://localhost:3000/movies', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: movieName,
                        thumbnail: fileName,
                        categoryname: movieCategory,
                        categoryId: Number($('#movieCategory').val())
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                })
                .then(response => response.json())
                .then(newMovie => handleMovies())
                .catch(err => console.log("Error Add Movie!"));
        }, 2500);
    }
});

$("#deleteMovie").on("click", () => {

    // Sweet Alert Silme işlemi uyarı mesajı
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Film silinsin mi?',
        text: "Silinen film geri alınamaz.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sil',
        cancelButtonText: 'İptal',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Film silindi.'
            })
            setTimeout(() => {
                deleteFilm = Number($('#deleteSearchList').val())
                fetch(`http://localhost:3000/movies/${deleteFilm}`, {
                        method: 'DELETE'
                    })
                    .then(refUser => handleMovies())
                    .catch(err => console.log("Delete Error!"));
            }, 2500);
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                '',
                'Silme işlemi iptal edildi.',
                'error'
            )
        }
    })
});

$("#searchCategory").on("change", () => {
    let valueSelect = Number($('#searchCategory').val());
    if (valueSelect >= 1) {
        fetch(`http://localhost:3000/movies?categoryId=${valueSelect}`, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(listUser => setMovies(listUser))
            .catch(err => console.log("Search Category Error!"));
    } else {
        handleMovies();
    }

})


initialApp();