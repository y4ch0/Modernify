// /src/js/navbar.js
export function initNavbar() {
    let navbarEnabled = false;
    document.querySelectorAll(".nav-collapse").forEach((element) => {
        element.addEventListener("click", () => {
            navbarEnabled = !navbarEnabled;
            document.getElementById("nav-menu").style.display = navbarEnabled ? "flex" : "none";
        });
    });

    let sideNavbarEnabled = false;
    document.querySelectorAll(".sidenav-collapse").forEach((element) => {
        element.addEventListener("click", () => {
            sideNavbarEnabled = !sideNavbarEnabled;
            document.getElementById("side-nav").style.display = sideNavbarEnabled ? "flex" : "none";
            if (document.querySelector("body>nav")) {
                document.querySelector("body>nav").style.display = sideNavbarEnabled ? "none" : "flex";
            }
            if (document.querySelector(".wcag-tools")) {
                document.querySelector(".wcag-tools").style.display = sideNavbarEnabled ? "none" : "flex";
            }
        });
    });

    let inlineNavbarEnabled = false;
    const inlineToggler = document.querySelector(".inline-nav-collapse");
    if (inlineToggler) {
        inlineToggler.addEventListener("click", (e) => {
            e.preventDefault();
            inlineNavbarEnabled = !inlineNavbarEnabled;
            const inlineNav = document.querySelector(".inline-nav ul");
            if (inlineNav) {
                inlineNav.style.display = inlineNavbarEnabled ? "flex" : "none";
            }
        });
    }

    if (document.querySelector(".collapsing-nav")) {
        window.addEventListener("scroll", () => {
            const navbar = document.querySelector(".collapsing-nav");
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }
}
