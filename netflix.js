const nav = document.getElementById("nav");

window.addEventListener("scroll", scrollActive);

// Scroll aşağı indiği zaman navbar'a efekt ekledik.
function scrollActive(e) {
    if (window.scrollY >= 100) {
        nav.classList.add("nav__black");
    } else {
        nav.classList.remove("nav__black");
    }
}