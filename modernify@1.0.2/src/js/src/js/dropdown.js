// /src/js/dropdown.js
export function initDropdowns() {
    const handleClick = (event) => {
        const toggler = event.target.closest('[data-toggle="dropdown"]');
        const clickedInsideDropdown = event.target.closest(".dropdown");

        if (toggler) {
            event.preventDefault();
            const dropdown = toggler.nextElementSibling;
            if (dropdown && dropdown.tagName.toLowerCase() === "ul") {
                dropdown.classList.toggle("show");
            }
        } else {
            document.querySelectorAll("ul.show").forEach((dropdown) => {
                const parentDropdown = dropdown.closest(".dropdown");
                const autoClose = parentDropdown?.getAttribute("data-auto-close");

                // If the clicked target is inside this dropdown and auto-close is "outside", skip closing
                if (autoClose === "outside" && clickedInsideDropdown === parentDropdown) {
                    return;
                }

                dropdown.classList.remove("show");
            });
        }
    };

    if (!document.body.__dropdown_initialized) {
        document.body.addEventListener("click", handleClick);
        document.body.__dropdown_initialized = true;
    }
}
