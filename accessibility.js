document.addEventListener("DOMContentLoaded", function () {
    const root = document.querySelector(":root");
    const defaultFontSize = getComputedStyle(root).getPropertyValue("--font-size");
    const defaultBackground = getComputedStyle(root).getPropertyValue("--background-color");
    const defaultFontColor = getComputedStyle(root).getPropertyValue("--text-default-color");
    const defaultPrimary = getComputedStyle(root).getPropertyValue("--primary-color");
    const defaultSecondary = getComputedStyle(root).getPropertyValue("--secondary-color");

    function revertVariables() {
        var r = document.querySelector(":root");
        r.style.setProperty("--background-color", defaultBackground);
        r.style.setProperty("--text-default-color", defaultFontColor);
        r.style.setProperty("--primary-color", defaultPrimary);
        r.style.setProperty("--secondary-color", defaultSecondary);
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
        r.style.setProperty("--background-color", "255, 255, 0");
        r.style.setProperty("--primary-color", "0, 0, 0");
        r.style.setProperty("--secondary-color", "0, 0, 0");
        r.style.setProperty("--primary-button-color", "0, 0, 0");
        r.style.setProperty("--secondary-button-color", "0, 0, 0");
    });

    var linkUnderline = false;

    document.querySelector(".wt-l-und").addEventListener("click", (e) => {
        e.preventDefault();
        linkUnderline = !linkUnderline;
        if (linkUnderline) {
            document.querySelectorAll("a").forEach((item) => {
                item.style.setProperty("text-decoration", "underline", "important");
            });
        } else {
            document.querySelectorAll("a").forEach((item) => {
                item.style.setProperty("text-decoration", "none", "");
            });
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
});
