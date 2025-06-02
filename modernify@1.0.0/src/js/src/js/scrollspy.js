// /src/js/scrollspy.js
export function initScrollSpy() {
    const links = document.querySelectorAll(".aside-items a");
    const sections = Array.from(links).map((link) => document.querySelector(link.getAttribute("href")));

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.75, // minimum 60% widoczności sekcji
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");

                links.forEach((link) => {
                    link.parentElement.classList.remove("current");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.parentElement.classList.add("current");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        if (section) observer.observe(section);
    });
}
