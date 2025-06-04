// Modernify @ 1.0.1

import { initNavbar } from "./js/navbar.js";
import { initDropdowns } from "./js/dropdown.js";
import { initModals } from "./js/modal.js";
import { initTooltips } from "./js/tooltip.js";
import { initCardSwitch } from "./js/card-switch.js";
import { initSliders } from "./js/slider.js";
import { initAccessibility } from "./js/accessibility.js";
import { initScrollSpy } from "./js/scrollspy.js";
import { initFloatingNavbar } from "./js/floating-navbar.js";

export function initAll() {
    initNavbar();
    initDropdowns();
    initModals();
    initTooltips();
    initCardSwitch();
    initSliders();
    initAccessibility();
    initScrollSpy();
    initFloatingNavbar();
}

if (typeof window !== "undefined") {
    window.Modernify = {
        initAll,
        initNavbar,
        initDropdowns,
        initModals,
        initTooltips,
        initCardSwitch,
        initSliders,
        initAccessibility,
        initScrollSpy,
        initFloatingNavbar,
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAll);
    } else {
        initAll();
    }
}
