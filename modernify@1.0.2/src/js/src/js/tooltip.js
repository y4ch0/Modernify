// /src/js/tooltip.js
export function initTooltips() {
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
