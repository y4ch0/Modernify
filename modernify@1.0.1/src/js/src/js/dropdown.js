// /src/js/dropdown.js
export function initDropdowns() {
    document.body.addEventListener("click", function (event) {
        const toggler = event.target.closest('[data-toggle="dropdown"]');
        if (toggler) {
            event.preventDefault();
            const dropdown = toggler.nextElementSibling;
            if (dropdown && dropdown.tagName === "UL") {
                dropdown.classList.toggle("show");
            }
        } else {
            document.querySelectorAll("ul.show").forEach((dropdown) => {
                dropdown.classList.remove("show");
            });
        }
    });
}
