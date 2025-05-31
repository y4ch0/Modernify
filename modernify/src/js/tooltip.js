// /src/js/tooltip.js
export function initTooltips() {
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
