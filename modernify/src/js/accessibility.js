// /src/js/accessibility.js
export function initAccessibility() {
    document.querySelectorAll("[data-contrast]").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.body.classList.toggle("high-contrast");
        });
    });

    document.querySelectorAll("[data-font-size]").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.body.classList.toggle("large-font");
        });
    });

    document.querySelectorAll("[data-font-family]").forEach((btn) => {
        btn.addEventListener("click", () => {
            document.body.classList.toggle("accessible-font");
        });
    });
}
