// /src/js/modal.js
export function initModals() {
    document.querySelectorAll('[data-toggle="modal"]').forEach((trigger) => {
        const targetSelector = trigger.target.getAttribute("data-target");
        const dialog = document.querySelector(targetSelector);
        if (dialog) {
            trigger.addEventListener("click", () => {
                dialog.setAttribute("open", "");
            });
        }
    });

    document.querySelectorAll(".dialog-close").forEach((btn) => {
        btn.addEventListener("click", () => {
            const dialog = document.querySelector(btn.getAttribute("data-target"));
            animateClose(dialog);
        });
    });

    document.querySelectorAll("dialog").forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
            const body = dialog.querySelector(".body");
            if (!body.contains(event.target) && dialog.dataset.disable_pe != "1") {
                animateClose(dialog);
            }
        });
    });

    function animateClose(dialog) {
        const body = dialog.querySelector(".body");
        const keyFrame = new KeyframeEffect(body, [{ transform: "scale(1)" }, { transform: "scale(0.8)" }], {
            duration: 300,
            easing: "ease",
        });
        const keyFrame1 = new KeyframeEffect(dialog, [{ opacity: "1" }, { opacity: "0" }], {
            duration: 300,
            easing: "ease",
        });
        const animation = new Animation(keyFrame, document.timeline);
        const animation1 = new Animation(keyFrame1, document.timeline);
        animation.play();
        animation1.play();
        animation.onfinish = () => dialog.close();
    }
}
