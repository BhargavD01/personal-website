window.addEventListener("load", function () {
    // Preloader logic
    const preloader = document.getElementById("preloader");
    preloader.classList.add("fade-out");

    // Initialize lazy loading after preloader
    initLazyLoading();

    setTimeout(() => {
        preloader.style.display = "none";
        document.body.classList.add("content-loaded");

        // Restore scroll position after images load
        const savedScrollY = sessionStorage.getItem("scrollPosition");
        if (savedScrollY !== null) {
            window.scrollTo(0, parseInt(savedScrollY));
        }
    }, 500);
});

// Save scroll position
window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("scrollPosition", window.scrollY);
});

// Lazy Loading with Intersection Observer
function initLazyLoading() {
    const lazyImages = document.querySelectorAll("img[loading='lazy']");

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('src');
                    img.removeAttribute('loading');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '200px 0px' // Load images 200px before they enter viewport
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.getAttribute('src');
        });
    }
}

// Scrolling text animation
document.addEventListener('DOMContentLoaded', () => {
    const textGroup = document.querySelector('.text-group');
    const container = document.querySelector('.text-container');

    if (textGroup && container) {
        const clone = textGroup.cloneNode(true);
        container.appendChild(clone);
        const duration = textGroup.children.length * 10;
        container.style.animationDuration = `${duration}s`;

        setTimeout(() => {
            container.classList.add('loaded');
        }, 100);
    }
});

// Navbar scroll shadow
window.addEventListener("scroll", () => {
    const subnav = document.querySelector(".subnav");
    if (subnav) {
        subnav.classList.toggle("scrolled", window.scrollY > 10);
    }
});
