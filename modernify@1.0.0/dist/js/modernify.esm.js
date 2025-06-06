// /src/js/navbar.js
function initNavbar() {
    let navbarEnabled = false;
    document.querySelectorAll(".nav-collapse").forEach((element) => {
        element.addEventListener("click", () => {
            navbarEnabled = !navbarEnabled;
            document.getElementById("nav-menu").style.display = navbarEnabled ? "flex" : "none";
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
}

// /src/js/dropdown.js
function initDropdowns() {
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

// /src/js/modal.js
function initModals() {
    document.querySelectorAll('[data-toggle="modal"]').forEach((trigger) => {
        const targetSelector = trigger.target.getAttribute("data-target");
        const dialog = document.querySelector(targetSelector);
        if (dialog) {
            trigger.addEventListener("click", () => {
                dialog.setAttribute("open", "");
            });
        }
    });

    document.querySelectorAll(".dialog-close").forEach((btn) => {
        btn.addEventListener("click", () => {
            const dialog = document.querySelector(btn.getAttribute("data-target"));
            animateClose(dialog);
        });
    });

    document.querySelectorAll("dialog").forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
            const body = dialog.querySelector(".body");
            if (!body.contains(event.target) && dialog.dataset.disable_pe != "1") {
                animateClose(dialog);
            }
        });
    });

    function animateClose(dialog) {
        const body = dialog.querySelector(".body");
        const keyFrame = new KeyframeEffect(body, [{ transform: "scale(1)" }, { transform: "scale(0.8)" }], {
            duration: 300,
            easing: "ease",
        });
        const keyFrame1 = new KeyframeEffect(dialog, [{ opacity: "1" }, { opacity: "0" }], {
            duration: 300,
            easing: "ease",
        });
        const animation = new Animation(keyFrame, document.timeline);
        const animation1 = new Animation(keyFrame1, document.timeline);
        animation.play();
        animation1.play();
        animation.onfinish = () => dialog.close();
    }
}

// /src/js/tooltip.js
function initTooltips() {
    const tooltip = document.createElement("div");
    tooltip.className = "custom-tooltip";
    document.body.appendChild(tooltip);

    document.addEventListener("mouseover", function (event) {
        const target = event.target.closest("[title]");
        if (!target) return;

        const titleText = target.getAttribute("title");
        target.removeAttribute("title");
        target.dataset.tooltip = titleText;

        tooltip.textContent = titleText;
        tooltip.style.visibility = "visible";
        positionTooltip(event, target, tooltip);
    });

    document.addEventListener("mousemove", function (event) {
        const target = event.target.closest("[data-tooltip]");
        if (target) {
            positionTooltip(event, target, tooltip);
        }
    });

    document.addEventListener("mouseout", function (event) {
        const target = event.target.closest("[data-tooltip]");
        if (!target) return;

        target.setAttribute("title", target.dataset.tooltip);
        delete target.dataset.tooltip;
        tooltip.style.visibility = "hidden";
    });

    function positionTooltip(event, target, tooltip) {
        const padding = 4;
        const maxWidth = window.innerWidth * 0.95;
        tooltip.style.maxWidth = `${maxWidth}px`;
        tooltip.style.position = "absolute";

        const tooltipRect = tooltip.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        let top = window.scrollY + targetRect.top - tooltipRect.height - padding;
        let left = window.scrollX + targetRect.left + (targetRect.width - tooltipRect.width) / 2;

        if (top < window.scrollY) top = window.scrollY + targetRect.bottom + padding;
        if (left < window.scrollX) left = window.scrollX + padding;
        if (left + tooltipRect.width > window.scrollX + window.innerWidth) {
            left = window.scrollX + window.innerWidth - tooltipRect.width - padding;
        }

        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
}

// /src/js/card-switch.js
function initCardSwitch() {
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

// /src/js/slider.js
function initSliders() {
    document.querySelectorAll(".slider").forEach((slider) => {
        const slidesContainer = slider.querySelector(".slides");
        const slides = slider.querySelectorAll(".slide");
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

// /src/js/accessibility.js
function initAccessibility() {
    const root = document.querySelector(":root");
    const getVar = (name) => getComputedStyle(root).getPropertyValue(name);
    const defaultFontSize = getVar("--font-size");
    const defaultBackground = getVar("--background-color");
    const defaultFontColor = getVar("--text-default-color");
    const defaultPrimary = getVar("--primary-color");
    const defaultSecondary = getVar("--secondary-color");
    const defaultPrimaryButton = getVar("--primary-button-color");
    const defaultSecondaryButton = getVar("--secondary-button-color");
    const defaultPrimaryButtonHover = getVar("--primary-button-color-hover");
    const defaultSecondaryButtonHover = getVar("--secondary-button-color-hover");
    const defaultLinkDecor = getVar("--link-default-decoration");
    const defaultPrimaryButtonText = getVar("--primary-button-text");
    const defaultSecondaryButtonText = getVar("--secondary-button-text");
    const defaultLabelColor = getVar("--input-label-color");
    const defaultBorderColor = getVar("--default-border-color");
    const defaultFontFamily = getVar("--root-font");

    function revertVariables() {
        const r = document.querySelector(":root");
        r.style.setProperty("--background-color", defaultBackground);
        r.style.setProperty("--text-default-color", defaultFontColor);
        r.style.setProperty("--primary-color", defaultPrimary);
        r.style.setProperty("--secondary-color", defaultSecondary);
        r.style.setProperty("--primary-button-color", defaultPrimaryButton);
        r.style.setProperty("--secondary-button-color", defaultSecondaryButton);
        r.style.setProperty("--primary-button-text", defaultPrimaryButtonText);
        r.style.setProperty("--secondary-button-text", defaultSecondaryButtonText);
        r.style.setProperty("--input-label-color", defaultLabelColor);
        r.style.setProperty("--default-border-color", defaultBorderColor);
        r.style.setProperty("--primary-button-color-hover", defaultPrimaryButtonHover);
        r.style.setProperty("--secondary-button-color-hover", defaultSecondaryButtonHover);
    }

    const fs1 = document.querySelector(".wt-fs-1");
    if (fs1) {
        fs1.addEventListener("click", (e) => {
            e.preventDefault();
            root.style.setProperty("--font-size", defaultFontSize);
        });
    }

    const fs2 = document.querySelector(".wt-fs-2");
    if (fs2) {
        fs2.addEventListener("click", (e) => {
            e.preventDefault();
            root.style.setProperty("--font-size", "18px");
        });
    }

    const colorOff = document.querySelector(".wt-c-off");
    if (colorOff) {
        colorOff.addEventListener("click", (e) => {
            e.preventDefault();
            revertVariables();
        });
    }

    const colorOn = document.querySelector(".wt-c-on");
    if (colorOn) {
        colorOn.addEventListener("click", (e) => {
            e.preventDefault();
            const r = document.querySelector(":root");
            r.style.setProperty("--text-default-color", "0, 0, 0");
            r.style.setProperty("--background-color", "255, 255, 0");
            r.style.setProperty("--primary-color", "0, 0, 0");
            r.style.setProperty("--secondary-color", "0, 0, 0");
            r.style.setProperty("--primary-button-color", "0, 0, 0");
            r.style.setProperty("--secondary-button-color", "0, 0, 0");
            r.style.setProperty("--primary-button-text", "255, 255, 255");
            r.style.setProperty("--secondary-button-text", "255, 255, 255");
            r.style.setProperty("--input-label-color", "0, 0, 0");
            r.style.setProperty("--default-border-color", "0, 0, 0");
            r.style.setProperty("--primary-button-color-hover", "60,60,60");
            r.style.setProperty("--secondary-button-color-hover", "60,60,60");
        });
    }

    let linkUnderline = false;
    const underlineBtn = document.querySelector(".wt-l-und");
    if (underlineBtn) {
        underlineBtn.addEventListener("click", (e) => {
            e.preventDefault();
            linkUnderline = !linkUnderline;
            underlineBtn.style.fontWeight = linkUnderline ? "bold" : "normal";
            root.style.setProperty("--link-default-decoration", linkUnderline ? "underline" : defaultLinkDecor);
        });
    }

    let verdanaEnabled = false;
    const verdanaBtn = document.querySelector(".wt-f-verdana");
    if (verdanaBtn) {
        verdanaBtn.addEventListener("click", (e) => {
            e.preventDefault();
            verdanaEnabled = !verdanaEnabled;
            verdanaBtn.style.fontWeight = verdanaEnabled ? "bold" : "normal";
            root.style.setProperty("--root-font", verdanaEnabled ? "Verdana, sans-serif" : defaultFontFamily);
        });
    }

    let toggled = false;
    const wcagToggler = document.querySelector(".wcag-tools .toggler");
    const wcagTools = document.querySelector(".wcag-tools");
    if (wcagToggler && wcagTools) {
        wcagToggler.addEventListener("click", (e) => {
            e.preventDefault();
            toggled = !toggled;
            wcagTools.style.transform = toggled ? "translateX(0)" : "translateX(calc(100% - 3.75rem))";
        });
    }
}

// /src/js/scrollspy.js
function initScrollSpy() {
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

function initInlineNav() {
    var inline_navbar_enabled = false;
    const inlineNav = document.querySelector(".inline-nav");
    if (inlineNav) {
        document.querySelector(".inline-nav-collapse").addEventListener("click", (e) => {
            e.preventDefault();
            inline_navbar_enabled = !inline_navbar_enabled;
            document.querySelector(".inline-nav ul").style.display = inline_navbar_enabled ? "flex" : "none";
        });
    }
}

// Manual init for frameworks
function initAll() {
    initNavbar();
    initDropdowns();
    initModals();
    initTooltips();
    initCardSwitch();
    initSliders();
    initAccessibility();
    initScrollSpy();
    initInlineNav();
}

// Auto-initialize for plain HTML
if (typeof window !== "undefined") {
    window.MyFramework = {
        initAll,
        initNavbar,
        initDropdowns,
        initModals,
        initTooltips,
        initCardSwitch,
        initSliders,
        initAccessibility,
        initScrollSpy,
        initInlineNav,
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAll);
    } else {
        initAll();
    }
}

export { initAll };
