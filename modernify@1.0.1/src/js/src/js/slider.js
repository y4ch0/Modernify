// /src/js/slider.js
export function initSliders() {
    document.querySelectorAll(".slider").forEach((slider) => {
        const slidesContainer = slider.querySelector(".slides");
        const slides = slider.querySelectorAll(".slide-item");
        const prevButton = slider.querySelector(".swipe-left");
        const nextButton = slider.querySelector(".swipe-right");
        let currentIndex = 0;

        const indicators = document.createElement("ol");
        indicators.classList.add("current-slide-indicator");
        slider.appendChild(indicators);

        slides.forEach((_, index) => {
            const dot = document.createElement("li");
            dot.addEventListener("click", () => {
                currentIndex = index;
                updateSliderPosition();
            });
            indicators.appendChild(dot);
        });

        const dots = indicators.querySelectorAll("li");

        function updateSliderPosition() {
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
            updateSliderPosition();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateSliderPosition();
        }

        nextButton?.addEventListener("click", nextSlide);
        prevButton?.addEventListener("click", prevSlide);
        updateIndicators();
    });
}
