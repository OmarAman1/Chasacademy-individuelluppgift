// 1) Flytta "tungt arbete" bort från kritiska rendering-ögonblicket
function simulateHeavyWork() {
    const start = Date.now();
    while (Date.now() - start < 200) {}
}

// Kör när webbläsaren har tid (minskar risk att störa LCP)
function runNonCriticalWork() {
    if ("requestIdleCallback" in window) {
        requestIdleCallback(() => simulateHeavyWork());
    } else {
        setTimeout(() => simulateHeavyWork(), 1);
    }
}

// 2) LCP-mätning via PerformanceObserver
(function observeLCP() {
    if (!("PerformanceObserver" in window)) return;

    let lastEntry;

    try {
        const po = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            lastEntry = entries[entries.length - 1];
        });

        po.observe({ type: "largest-contentful-paint", buffered: true });

        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState !== "hidden" || !lastEntry) return;

            const lcpMs = Math.round(lastEntry.startTime);
            console.log("[LCP]", lcpMs, "ms", lastEntry);

            const el = document.getElementById("lcp-value");
            if (el) el.textContent = `${(lcpMs / 1000).toFixed(2)}s`;
        });
    } catch (e) {
        console.log("LCP observer not supported:", e);
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    // Starta icke-kritiskt arbete efter att DOM är redo
    runNonCriticalWork();

   // 3) Add-to-cart (aria-live istället för alert)
       const cartStatus = document.getElementById("cart-status");

    document.querySelectorAll(".add-to-cart").forEach(function (btn) {
    btn.addEventListener("click", function () {
        if (cartStatus) {
            cartStatus.textContent = "Item added to cart!";
        }
    });
});

    // 4) Newsletter: riktig submit + live region istället för bara alert
    const form = document.getElementById("newsletter-form");
    const status = document.getElementById("form-status");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            if (status) {
                status.classList.remove("visually-hidden");
                status.textContent = "Thank you for subscribing!";
            } else {
                alert("Thank you for subscribing!");
            }
        });
    }

    // 5) axe-körning
    const params = new URLSearchParams(window.location.search);
    const shouldRunAxe = params.get("axe") === "1";

    if (shouldRunAxe && window.axe) {
        window.axe.run(document).then((results) => {
            console.log("axe violations:", results.violations);
            console.log("axe passes:", results.passes.length);
            console.log("axe incomplete:", results.incomplete.length);
        });
    }
});