import { initNavbar } from "./js/navbar.js";
import { initDropdowns } from "./js/dropdown.js";
import { initModals } from "./js/modal.js";
import { initTooltips } from "./js/tooltip.js";
import { initCardSwitch } from "./js/card-switch.js";
import { initSliders } from "./js/slider.js";
import { initAccessibility } from "./js/accessibility.js";
import { initScrollSpy } from "./js/scrollspy.js";
import { initInlineNav } from "./js/inline-navbar.js";

// Manual init for frameworks
export function initAll() {
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
