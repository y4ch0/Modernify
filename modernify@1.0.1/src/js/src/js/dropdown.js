// /src/js/dropdown.js
export function initDropdowns() {
    const handleClick = (event) => {
        const toggler = event.target.closest('[data-toggle="dropdown"]');
        if (toggler) {
            event.preventDefault();
            const dropdown = toggler.nextElementSibling;
            if (dropdown && dropdown.tagName.toLowerCase() === "ul") {
                dropdown.classList.toggle("show");
            }
        } else {
            document.querySelectorAll("ul.show").forEach((dropdown) => {
                dropdown.classList.remove("show");
            });
        }
    };

    if (!document.body.__dropdown_initialized) {
        document.body.addEventListener("click", handleClick);
        document.body.__dropdown_initialized = true;
    }
}
