document.addEventListener("DOMContentLoaded", function () {
    const root = document.querySelector(":root");
    const savedVariables = {};
    const defaultFontSize = getComputedStyle(root).getPropertyValue("--font-size");

    function saveCSSVariables() {
        const styles = getComputedStyle(root);
        const getCSSProp = (element, propName) => getComputedStyle(root).getPropertyValue(propName);
        console.log(getCSSProp);
    }

    function revertVariables() {
        var r = document.querySelector(":root");
        for (const [name, value] of Object.entries(savedVariables)) {
            r.style.setProperty(name, value);
            console.log("Made revert");
        }
    }

    saveCSSVariables();

    document.querySelector(".wt-fs-1").addEventListener("click", (e) => {
        e.preventDefault();
        var r = document.querySelector(":root");
        r.style.setProperty("--font-size", defaultFontSize);
    });

    document.querySelector(".wt-fs-2").addEventListener("click", (e) => {
        e.preventDefault();
        var r = document.querySelector(":root");
        r.style.setProperty("--font-size", "20px");
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
});
