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