export function initInlineNav() {
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
