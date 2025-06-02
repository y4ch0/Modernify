// /src/js/card-switch.js
export function initCardSwitch() {
    document.querySelectorAll(".card-switch").forEach(function (switcher) {
        const togglers = switcher.querySelectorAll(".togglers .card-toggler");
        const cards = switcher.querySelectorAll(".cards .card-item");

        function setActiveTab(index) {
            togglers.forEach((toggler, i) => {
                toggler.classList.toggle("current", i === index);
            });
            cards.forEach((card, i) => {
                card.style.display = i === index ? "block" : "none";
            });
        }

        togglers.forEach((toggler, index) => {
            toggler.addEventListener("click", function (event) {
                event.preventDefault();
                setActiveTab(index);
            });
        });

        setActiveTab(0);
    });
}
