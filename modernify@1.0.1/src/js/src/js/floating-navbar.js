export function initFloatingNavbar() {
    const nav = document.querySelector(".floating-nav");

    if (!nav) return;

    function handleScroll() {
        if (window.scrollY > 10) {
            nav.classList.add("navbar-scrolled");
        } else {
            nav.classList.remove("navbar-scrolled");
        }
    }

    handleScroll(); // Run once on load
    window.addEventListener("scroll", handleScroll);
}
