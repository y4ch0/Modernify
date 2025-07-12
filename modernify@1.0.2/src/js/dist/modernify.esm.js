// /src/js/navbar.js
function initNavbar() {
    let navbarEnabled = false;
    document.querySelectorAll(".nav-collapse").forEach((element) => {
        element.addEventListener("click", () => {
            navbarEnabled = !navbarEnabled;
            document.getElementById("nav-menu").style.display = navbarEnabled ? "flex" : "none";
        });
    });

    let sideNavbarEnabled = false;
    document.querySelectorAll(".sidenav-collapse").forEach((element) => {
        element.addEventListener("click", () => {
            sideNavbarEnabled = !sideNavbarEnabled;
            document.getElementById("side-nav").style.display = sideNavbarEnabled ? "flex" : "none";
            if (document.querySelector("body>nav")) {
                document.querySelector("body>nav").style.display = sideNavbarEnabled ? "none" : "flex";
            }
            if (document.querySelector(".wcag-tools")) {
                document.querySelector(".wcag-tools").style.display = sideNavbarEnabled ? "none" : "flex";
            }
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

    if (document.querySelector(".collapsing-nav")) {
        window.addEventListener("scroll", () => {
            const navbar = document.querySelector(".collapsing-nav");
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        });
    }
}

// /src/js/dropdown.js
function initDropdowns() {
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

// /src/js/modal.js
function initModals() {
    document.querySelectorAll('[data-toggle="modal"]').forEach((trigger) => {
        const targetSelector = trigger.dataset.target;
        const dialog = document.querySelector(targetSelector);
        if (dialog) {
            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                dialog.setAttribute("open", "");
            });
        }
    });

    document.querySelectorAll(".dialog-close").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
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
        const keyFrame = new KeyframeEffect(body, [{ transform: "scale(1)" }, { transform: "scale(0.85)" }], {
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
    tooltip.setAttribute("role", "tooltip");
    tooltip.style.position = "absolute";
    tooltip.style.visibility = "hidden";
    document.body.appendChild(tooltip);

    function showTooltip(target, event) {
        if (!target.hasAttribute("title") || target.dataset.tooltip !== "toggle") return;

        const titleText = target.getAttribute("title");
        target.removeAttribute("title");
        target.dataset.tooltipContent = titleText;

        tooltip.textContent = titleText;
        tooltip.style.visibility = "visible";
        positionTooltip(event, target, tooltip);
    }

    function hideTooltip(target) {
        if (target.dataset.tooltipContent) {
            target.setAttribute("title", target.dataset.tooltipContent);
            delete target.dataset.tooltipContent;
        }
        tooltip.style.visibility = "hidden";
    }

    // MOUSE SUPPORT
    document.addEventListener("mouseover", function (event) {
        const target = event.target.closest("[data-tooltip='toggle']");
        if (!target) return;
        showTooltip(target, event);
    });

    document.addEventListener("mousemove", function (event) {
        const target = event.target.closest("[data-tooltip='toggle']");
        if (!target) return;
        if (tooltip.style.visibility === "visible") {
            positionTooltip(event, target, tooltip);
        }
    });

    document.addEventListener("mouseout", function (event) {
        const target = event.target.closest("[data-tooltip='toggle']");
        if (!target) return;
        hideTooltip(target);
    });

    // KEYBOARD ACCESSIBILITY SUPPORT
    document.addEventListener("focusin", function (event) {
        const target = event.target.closest("[data-tooltip='toggle']");
        if (!target) return;
        showTooltip(target, event);
    });

    document.addEventListener("focusout", function (event) {
        const target = event.target.closest("[data-tooltip='toggle']");
        if (!target) return;
        hideTooltip(target);
    });

    function positionTooltip(event, target, tooltip) {
        const padding = 6;
        const maxWidth = window.innerWidth * 0.95;
        tooltip.style.maxWidth = `${maxWidth}px`;

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

// /src/js/carousel.js
function initCarousel() {
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

// /src/js/accessibility.js
function initAccessibility() {
    const root = document.querySelector(":root");
    const getVar = (name) => getComputedStyle(root).getPropertyValue(name);
    const defaultFontSize = getVar("--mdf-font-size");
    const defaultBackground = getVar("--mdf-background-color");
    const defaultFontColor = getVar("--mdf-text-default-color");
    const defaultPrimary = getVar("--mdf-primary-color");
    const defaultSecondary = getVar("--mdf-secondary-color");
    const defaultPrimaryButton = getVar("--mdf-primary-button-color");
    const defaultSecondaryButton = getVar("--mdf-secondary-button-color");
    const defaultPrimaryButtonHover = getVar("--mdf-primary-button-color-hover");
    const defaultSecondaryButtonHover = getVar("--mdf-secondary-button-color-hover");
    const defaultLinkDecor = getVar("--mdf-link-default-decoration");
    const defaultPrimaryButtonText = getVar("--mdf-primary-button-text");
    const defaultSecondaryButtonText = getVar("--mdf-secondary-button-text");
    const defaultLabelColor = getVar("--mdf-input-label-color");
    const defaultBorderColor = getVar("--mdf-default-border-color");
    const defaultFontFamily = getVar("--mdf-root-font");

    function revertVariables() {
        const r = document.querySelector(":root");
        r.style.setProperty("--mdf-background-color", defaultBackground);
        r.style.setProperty("--mdf-text-default-color", defaultFontColor);
        r.style.setProperty("--mdf-primary-color", defaultPrimary);
        r.style.setProperty("--mdf-secondary-color", defaultSecondary);
        r.style.setProperty("--mdf-primary-button-color", defaultPrimaryButton);
        r.style.setProperty("--mdf-secondary-button-color", defaultSecondaryButton);
        r.style.setProperty("--mdf-primary-button-text", defaultPrimaryButtonText);
        r.style.setProperty("--mdf-secondary-button-text", defaultSecondaryButtonText);
        r.style.setProperty("--mdf-input-label-color", defaultLabelColor);
        r.style.setProperty("--mdf-default-border-color", defaultBorderColor);
        r.style.setProperty("--mdf-primary-button-color-hover", defaultPrimaryButtonHover);
        r.style.setProperty("--mdf-secondary-button-color-hover", defaultSecondaryButtonHover);
    }

    const fs1 = document.querySelector(".wt-fs-1");
    if (fs1) {
        fs1.addEventListener("click", (e) => {
            e.preventDefault();
            root.style.setProperty("--mdf-font-size", defaultFontSize);
        });
    }

    const fs2 = document.querySelector(".wt-fs-2");
    if (fs2) {
        fs2.addEventListener("click", (e) => {
            e.preventDefault();
            root.style.setProperty("--mdf-font-size", "18px");
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
            r.style.setProperty("--mdf-text-default-color", "#000000");
            r.style.setProperty("--mdf-background-color", "#ffff00");
            r.style.setProperty("--mdf-primary-color", "#000000");
            r.style.setProperty("--mdf-secondary-color", "#000000");
            r.style.setProperty("--mdf-primary-button-color", "#000000");
            r.style.setProperty("--mdf-secondary-button-color", "#000000");
            r.style.setProperty("--mdf-primary-button-text", "#ffffff");
            r.style.setProperty("--mdf-secondary-button-text", "#ffffff");
            r.style.setProperty("--mdf-input-label-color", "#000000");
            r.style.setProperty("--mdf-default-border-color", "#000000");
            r.style.setProperty("--mdf-primary-button-color-hover", "#3c3c3c");
            r.style.setProperty("--mdf-secondary-button-color-hover", "#3c3c3c");
        });
    }

    let linkUnderline = false;
    const underlineBtn = document.querySelector(".wt-l-und");
    if (underlineBtn) {
        underlineBtn.addEventListener("click", (e) => {
            e.preventDefault();
            linkUnderline = !linkUnderline;
            underlineBtn.style.fontWeight = linkUnderline ? "bold" : "normal";
            root.style.setProperty("--mdf-link-default-decoration", linkUnderline ? "underline" : defaultLinkDecor);
        });
    }

    let verdanaEnabled = false;
    const verdanaBtn = document.querySelector(".wt-f-verdana");
    if (verdanaBtn) {
        verdanaBtn.addEventListener("click", (e) => {
            e.preventDefault();
            verdanaEnabled = !verdanaEnabled;
            verdanaBtn.style.fontWeight = verdanaEnabled ? "bold" : "normal";
            root.style.setProperty("--mdf-root-font", verdanaEnabled ? "Verdana, sans-serif" : defaultFontFamily);
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

// Manual init for frameworks
function initAll() {
    initNavbar();
    initDropdowns();
    initModals();
    initTooltips();
    initCardSwitch();
    initCarousel();
    initAccessibility();
    initScrollSpy();
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
        initCarousel,
        initAccessibility,
        initScrollSpy,
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAll);
    } else {
        initAll();
    }
}

export { initAll };
