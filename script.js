// Hover interaction for the UAE map on the homepage.
// Updates the info card with the emirate's name + sample count.

const emirates = document.querySelectorAll('.emirate');
const infoName = document.querySelector('.map-info-name');
const infoCount = document.querySelector('.map-info-count');

emirates.forEach((shape) => {
    shape.addEventListener('mouseenter', () => {
        emirates.forEach((s) => s.classList.remove('is-active'));
        shape.classList.add('is-active');

        infoName.textContent = shape.dataset.name;
        infoCount.textContent = Number(shape.dataset.samples).toLocaleString();
    });
});

/* TRIAL: click handling for image-based map pins */
const mapPins = document.querySelectorAll('.map-pin');

mapPins.forEach((pin) => {
    pin.addEventListener('click', () => {
        mapPins.forEach((p) => p.classList.remove('is-active'));
        pin.classList.add('is-active');

        infoName.textContent = pin.dataset.name;
        infoCount.textContent = Number(pin.dataset.samples).toLocaleString();
    });
});

/* ===== Nationality Counter Animation (smooth) ===== */
const natCounter = document.getElementById('natCounter');

if (natCounter) {
    const target = 200;
    const duration = 1800; // total animation time in ms
    let hasAnimated = false;

    function easeOutQuad(t) {
        return t * (2 - t);
    }

    function runCounter() {
        if (hasAnimated) return;
        hasAnimated = true;

        const startTime = performance.now();

        function tick(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuad(progress);
            const current = Math.floor(eased * target);

            natCounter.textContent = progress < 1 ? current : `${target}+`;

            if (progress < 1) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter();
                observer.disconnect();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(natCounter);
}