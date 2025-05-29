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

// Thumbnail click functionality
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    // Sample image URLs - replace with your actual image paths
    const imageUrls = [
        'https://genrage.com/cdn/shop/files/14_1.png?v=1740113446&width=1000',
        'https://genrage.com/cdn/shop/files/13_1.png?v=1740113446&width=1000',
        'https://genrage.com/cdn/shop/files/20_1.png?v=1739900788&width=1000',
        'https://genrage.com/cdn/shop/files/13_1.png?v=1740113446&width=1000',
        'https://genrage.com/cdn/shop/files/19_1.png?v=1739900788&width=1000',
        'https://genrage.com/cdn/shop/files/IMG_3726.png?v=1742198846&width=1000'
    ];
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Change main image
            const index = this.getAttribute('data-index');
            mainImage.src = imageUrls[index];
        });
    });
    
    // Size selection
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Review section toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const ratingSummary = document.querySelector('.rating-summary');
  const reviewsContainer = document.querySelector('.reviews-container');
  
  if (ratingSummary) {
    ratingSummary.addEventListener('click', function() {
      reviewsContainer.classList.toggle('reviews-expanded');
      const arrow = this.querySelector('.dropdown-arrow');
      arrow.textContent = arrow.textContent === '▼' ? '▲' : '▼';
    });
  }
});

