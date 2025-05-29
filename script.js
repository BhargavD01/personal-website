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

// Pagination logic
let currentPage = 1;
const totalPages = document.querySelectorAll(".product-grid").length;

function showPage(page) {
    // Hide all pages
    document.querySelectorAll(".product-grid").forEach(grid => {
        grid.style.display = "none";
    });

    // Show current page
    document.getElementById(`page-${page}`).style.display = "grid";

    // Update active button
    document.querySelectorAll(".page-btn[data-page]").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.page == page);
    });

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update current page
    currentPage = page;

    // Disable arrows at boundaries
    document.querySelectorAll(".page-btn.prev").forEach(btn => {
        btn.classList.toggle("disabled", currentPage === 1);
    });

    document.querySelectorAll(".page-btn.next").forEach(btn => {
        btn.classList.toggle("disabled", currentPage === totalPages);
    });
}

// Dynamic Product Count - TOTAL across all pages
function updateProductCount() {
    const allProducts = document.querySelectorAll('.product-card').length;
    document.getElementById('product-counter').textContent = allProducts;
}

// Grid/List View Toggle
function initViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const productContainer = document.getElementById('product-container');
    const productGrids = document.querySelectorAll('.product-grid');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Toggle layout
            if (btn.dataset.view === 'list') {
                productContainer.classList.add('list-view-active');
                productGrids.forEach(grid => {
                    grid.classList.add('list-view-layout');
                    grid.classList.remove('grid-view-layout');
                });
            } else {
                productContainer.classList.remove('list-view-active');
                productGrids.forEach(grid => {
                    grid.classList.add('grid-view-layout');
                    grid.classList.remove('list-view-layout');
                });
            }
        });
    });

    // Initialize default grid view
    productGrids.forEach(grid => {
        grid.classList.add('grid-view-layout');
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Set up pagination
    document.querySelectorAll('.page-btn[data-page]').forEach(btn => {
        btn.addEventListener("click", () => {
            const page = parseInt(btn.getAttribute("data-page"));
            showPage(page);
        });
    });

    document.querySelectorAll(".page-btn.prev").forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentPage > 1) showPage(currentPage - 1);
        });
    });

    document.querySelectorAll(".page-btn.next").forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentPage < totalPages) showPage(currentPage + 1);
        });
    });

    // Initialize components
    initViewToggle();
    updateProductCount(); // Shows total product count
    showPage(1); // Start on page 1
});

window.addEventListener("scroll", () => {
    const subnav = document.querySelector(".subnav");
    subnav.classList.toggle("scrolled", window.scrollY > 10);
});  //adds a sutle shadow to the sub-nav when scrolled.

// Toggle dropdown for the sort by button:
const sortButton = document.querySelector('.sort-by-button');
const sortDropdown = document.querySelector('.sort-dropdown');
const arrow = document.querySelector('.sort-by-button .arrow');

sortButton.addEventListener('click', (e) => {
    e.stopPropagation();
    sortDropdown.classList.toggle('active');
    arrow.style.transform = sortDropdown.classList.contains('active')
        ? 'rotate(180deg)'
        : 'rotate(0)';
});

// Close when clicking elsewhere
document.addEventListener('click', () => {
    sortDropdown.classList.remove('active');
    arrow.style.transform = 'rotate(0)';
});

// Handle sort selection
document.querySelectorAll('.sort-option').forEach(option => {
    option.addEventListener('click', () => {
        sortButton.textContent = `SORT BY: ${option.textContent}`;
        sortDropdown.classList.remove('active');
        arrow.style.transform = 'rotate(0)';
        // Add your sorting logic here
        console.log(`Sorted by: ${option.textContent}`);
    });
});

function goToProduct(el) {
  const id = el.getAttribute("data-product-id");
  window.location.href = `product.html?id=${id}`;
}

let debounceTimer;
window.addEventListener("scroll", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const subnav = document.querySelector(".subnav");
    subnav.classList.toggle("scrolled", window.scrollY > 10);
  }, 50);
});

