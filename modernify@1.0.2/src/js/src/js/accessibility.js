// /src/js/accessibility.js
export function initAccessibility() {
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
