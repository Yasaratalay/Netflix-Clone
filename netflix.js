const nav = document.querySelector(".nav");
const searchInput = document.querySelector(".searchInput");

window.addEventListener("scroll", scrollActive);

function scrollActive(e) {
    if (window.scrollY >= 100) {
        nav.classList.add("navBlack");
        searchInput.classList.add("searchInput");
    } else {
        nav.classList.remove("navBlack");
        searchInput.classList.remove("searchInput");
    }
}

$('#exampleModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let recipient = button.data('whatever');
    let modal = $(this);
    modal.find('.modal-title').text('New message to ' + recipient);
    modal.find('.modal-body input').val(recipient);
})