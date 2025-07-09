// /src/js/carousel.js
export function initCarousel() {
    document.querySelectorAll(".carousel").forEach((carousel) => {
        if (carousel.querySelector(".current-slide-indicator")) return;

        const slidesContainer = carousel.querySelector(".slides");
        const slides = carousel.querySelectorAll(".slide-item");
        const prevButton = carousel.querySelector(".swipe-left");
        const nextButton = carousel.querySelector(".swipe-right");
        let currentIndex = 0;

        const indicators = document.createElement("ol");
        indicators.classList.add("current-slide-indicator");
        carousel.appendChild(indicators);

        slides.forEach((_, index) => {
            const dot = document.createElement("li");
            dot.addEventListener("click", () => {
                currentIndex = index;
                updatecarouselPosition();
            });
            indicators.appendChild(dot);
        });

        const dots = indicators.querySelectorAll("li");

        function updatecarouselPosition() {
            const offset = -currentIndex * 100;
            slidesContainer.style.transform = `translateX(${offset}%)`;
            updateIndicators();
        }

        function updateIndicators() {
            dots.forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updatecarouselPosition();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updatecarouselPosition();
        }

        nextButton?.addEventListener("click", nextSlide);
        prevButton?.addEventListener("click", prevSlide);
        updateIndicators();
    });
}
