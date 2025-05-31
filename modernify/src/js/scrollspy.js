// /src/js/scrollspy.js
export function initScrollSpy() {
    const navLinks = document.querySelectorAll("[data-scrollspy]");
    const sections = Array.from(navLinks).map((link) => {
        const targetId = link.getAttribute("href")?.replace("#", "");
        return document.getElementById(targetId);
    });

    function onScroll() {
        const scrollY = window.scrollY + 100; // offset to trigger earlier
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (!section) continue;
            if (scrollY >= section.offsetTop) {
                navLinks.forEach((link) => link.classList.remove("active"));
                navLinks[i]?.classList.add("active");
                break;
            }
        }
    }

    window.addEventListener("scroll", onScroll);
    window.addEventListener("load", onScroll);
}
