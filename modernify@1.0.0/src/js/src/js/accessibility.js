// /src/js/accessibility.js
export function initAccessibility() {
    const root = document.querySelector(":root");
    const defaultFontSize = getComputedStyle(root).getPropertyValue("--font-size");
    const defaultBackground = getComputedStyle(root).getPropertyValue("--background-color");
    const defaultFontColor = getComputedStyle(root).getPropertyValue("--text-default-color");
    const defaultPrimary = getComputedStyle(root).getPropertyValue("--primary-color");
    const defaultSecondary = getComputedStyle(root).getPropertyValue("--secondary-color");
    const defaultPrimaryButton = getComputedStyle(root).getPropertyValue("--primary-button-color");
    const defaultSecondaryButton = getComputedStyle(root).getPropertyValue("--secondary-button-color");
    const defaultPrimaryButtonHover = getComputedStyle(root).getPropertyValue("--primary-button-color-hover");
    const defaultSecondaryButtonHover = getComputedStyle(root).getPropertyValue("--secondary-button-color-hover");
    const defaultLinkDecor = getComputedStyle(root).getPropertyValue("--link-default-decoration");
    const defaultPrimaryButtonText = getComputedStyle(root).getPropertyValue("--primary-button-text");
    const defaultSecondaryButtonText = getComputedStyle(root).getPropertyValue("--secondary-button-text");
    const defaultLabelColor = getComputedStyle(root).getPropertyValue("--input-label-color");
    const defaultBorderColor = getComputedStyle(root).getPropertyValue("--default-border-color");
    const defaultFontFamily = getComputedStyle(root).getPropertyValue("--root-font");

    function revertVariables() {
        var r = document.querySelector(":root");
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

    document.querySelector(".wt-fs-1").addEventListener("click", (e) => {
        e.preventDefault();
        var r = document.querySelector(":root");
        r.style.setProperty("--font-size", defaultFontSize);
    });

    document.querySelector(".wt-fs-2").addEventListener("click", (e) => {
        e.preventDefault();
        var r = document.querySelector(":root");
        r.style.setProperty("--font-size", "18px");
    });

    document.querySelector(".wt-c-off").addEventListener("click", (e) => {
        e.preventDefault();
        revertVariables();
    });

    document.querySelector(".wt-c-on").addEventListener("click", (e) => {
        e.preventDefault();
        var r = document.querySelector(":root");
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

    var linkUnderline = false;

    document.querySelector(".wt-l-und").addEventListener("click", (e) => {
        e.preventDefault();
        linkUnderline = !linkUnderline;
        if (linkUnderline) {
            document.querySelector(".wt-l-und").style.fontWeight = "bold";
            document.querySelector(":root").style.setProperty("--link-default-decoration", "underline");
        } else {
            document.querySelector(".wt-l-und").style.fontWeight = "normal";
            document.querySelector(":root").style.setProperty("--link-default-decoration", defaultLinkDecor);
        }
    });

    var verdanaEnabled = false;

    document.querySelector(".wt-f-verdana").addEventListener("click", (e) => {
        e.preventDefault();
        verdanaEnabled = !verdanaEnabled;
        if (verdanaEnabled) {
            document.querySelector(".wt-f-verdana").style.fontWeight = "bold";
            document.querySelector(":root").style.setProperty("--root-font", "Verdana, sans-serif");
        } else {
            document.querySelector(".wt-f-verdana").style.fontWeight = "normal";
            document.querySelector(":root").style.setProperty("--root-font", defaultFontFamily);
        }
    });

    var toggled = false;

    document.querySelector(".wcag-tools .toggler").addEventListener("click", (e) => {
        e.preventDefault();
        toggled = !toggled;
        if (toggled) {
            const root = document.querySelector(".wcag-tools");
            root.style.transform = "translateX(0)";
        } else {
            const root = document.querySelector(".wcag-tools");
            root.style.transform = "translateX(calc(100% - 3.75rem))";
        }
    });
}
