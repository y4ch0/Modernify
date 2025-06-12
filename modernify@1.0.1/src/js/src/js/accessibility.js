// /src/js/accessibility.js
export function initAccessibility() {
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
