let reviews = [];

// Load reviews from localStorage if available
const savedReviews = localStorage.getItem('reviews');
if (savedReviews) {
    reviews = JSON.parse(savedReviews);
} else {
    // Sample review data
    reviews = [
        {
            rating: 3,
            content: "Really loved it!",
            reviewer: "HIMALAYA V.",
            location: "JODIPIUR, RJ",
            product: "Ruthless Dark G...",
            date: "2 days ago"
        },
        {
            rating: 5,
            content: "I dig it!\nAwesome 😊",
            reviewer: "Sunny A.",
            location: "KAMRUP METRO, AS",
            product: "Reaper Body Lon...",
            date: "1 week ago"
        },
        {
            rating: 5,
            content: "Really fun nice!",
            reviewer: "Sunny A.",
            location: "KAMRUP METRO, AS",
            product: "Bomber Jacket",
            date: "1 week ago"
        },
        {
            rating: 5,
            content: "Remarkable!\ngo for it!",
            reviewer: "Samank P.",
            location: "HAZARBAG, JH",
            product: "Pythonic Unisex...",
            date: "1 month ago"
        },
        {
            rating: 5,
            content: "Definitely recommended!\n- awesome",
            reviewer: "Vaibhav G.",
            location: "NAGPUR, MH",
            product: "Exile Bomber Jacket",
            date: "3 weeks ago"
        },
        {
            rating: 4,
            content: "Great\nBest quality and very good comfortable powered by fera",
            reviewer: "Besley D. 🟡",
            location: "CHENNAI TN",
            product: "Mutation Unisex...",
            date: "2 weeks ago"
        },
        {
            rating: 4,
            content: "Perfect fit and quality!",
            reviewer: "Rahul M.",
            location: "NORTH WEST, DL",
            product: "Dracon Unisex S...",
            date: "3 days ago"
        },
        {
            rating: 4,
            content: "Perfect fit and quality!",
            reviewer: "Rahul M.",
            location: "NORTH WEST, DL",
            product: "Dracon Unisex S...",
            date: "3 days ago"
        },
        {
            rating: 4,
            content: "Perfect fit and quality!",
            reviewer: "Rahul M.",
            location: "NORTH WEST, DL",
            product: "Dracon Unisex S...",
            date: "3 days ago"
        },
        {
            rating: 4,
            content: "Perfect fit and quality!",
            reviewer: "Rahul M.",
            location: "NORTH WEST, DL",
            product: "Dracon Unisex S...",
            date: "3 days ago"
        },
        {
            rating: 4,
            content: "Perfect fit and quality!",
            reviewer: "Rahul M.",
            location: "NORTH WEST, DL",
            product: "Dracon Unisex S...",
            date: "3 days ago"
        }
    ];
}

// DOM elements
const reviewsGrid = document.getElementById('reviewsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const reviewForm = document.getElementById('reviewForm');
const starRating = document.querySelectorAll('.star-rating .star');
const ratingInput = document.getElementById('reviewRating');
const modal = document.getElementById('reviewModal');
const modalContent = document.getElementById('modalReviewContent');
const closeModal = document.querySelector('.close-modal');

// Add event listener to close modal on clicking the close button
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Add event listener to close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize
let visibleReviews = 6;
let selectedRating = 0;

// Function to render stars based on rating
function renderStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '★' : '☆';
    }
    return stars;
}

// Function to create a review card
function createReviewCard(review) {
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card';

    reviewCard.innerHTML = `
        <div class="review-rating">
            ${renderStars(review.rating)}
            <span class="review-date">${review.date}</span>
        </div>
        <div class="review-content">${review.content.replace(/\n/g, '<br>')}</div>
        <div class="reviewer-info">
            <div class="reviewer-name">${review.reviewer}</div>
            <div class="reviewer-location">${review.location}</div>
${review.product ? `<a href="#" class="product-link">${review.product}</a>` : ''}
        </div>
    `;

    // Add click event to show modal
    reviewCard.addEventListener('click', () => {
        showModal(review);
    });

    return reviewCard;
}

// Show delete confirmation modal and handle confirm/cancel
const deleteConfirmModal = document.getElementById('deleteConfirmModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

let reviewToDelete = null;

function showDeleteConfirmModal(review) {
    reviewToDelete = review;
    deleteConfirmModal.style.display = 'block';
}

confirmDeleteBtn.addEventListener('click', () => {
    if (reviewToDelete) {
        // Remove review from array
        reviews = reviews.filter(r => !(r.reviewer === reviewToDelete.reviewer && r.content === reviewToDelete.content && r.date === reviewToDelete.date));
        // Update localStorage
        localStorage.setItem('reviews', JSON.stringify(reviews));
        // Reload reviews
        loadReviews();
        // Hide modal
        deleteConfirmModal.style.display = 'none';
        reviewToDelete = null;
    }
});

cancelDeleteBtn.addEventListener('click', () => {
    // Hide modal without deleting
    deleteConfirmModal.style.display = 'none';
    reviewToDelete = null;
});

// Close modal when clicking outside modal content
window.addEventListener('click', (event) => {
    if (event.target === deleteConfirmModal) {
        deleteConfirmModal.style.display = 'none';
        reviewToDelete = null;
    }
});

// Function to show modal with full review
function showModal(review) {
    modalContent.innerHTML = `
        <div class="review-rating">
            ${renderStars(review.rating)}
            <span class="review-date">${review.date}</span>
        </div>
        <h2>${review.content.split('\n')[0]}</h2>
        <div class="review-content">${review.content.replace(/\n/g, '<br>').replace(review.content.split('\n')[0], '')}</div>
        <div class="reviewer-info">
            <div class="reviewer-name">${review.reviewer}</div>
            <div class="reviewer-location">${review.location}</div>
            ${review.product ? `<div class="product-link">Product: ${review.product}</div>` : ''}
        </div>
    `;
    modal.style.display = 'block';
}


// Load reviews function
function loadReviews() {
    // Clear existing reviews
    reviewsGrid.innerHTML = '';
    
    // Show only the visible reviews
    const reviewsToShow = reviews.slice(0, visibleReviews);
    
    reviewsToShow.forEach(review => {
        reviewsGrid.appendChild(createReviewCard(review));
    });
    
    // Hide button if all reviews are shown
    loadMoreBtn.style.display = visibleReviews >= reviews.length ? 'none' : 'block';
}

 // Load more reviews
loadMoreBtn.addEventListener('click', () => {
    visibleReviews = Math.min(visibleReviews + 3, reviews.length);
    loadReviews();

    // Scroll to show new reviews
    reviewsGrid.scrollLeft = reviewsGrid.scrollWidth;
});

 // Flush My Review button functionality
const flushMyReviewBtn = document.getElementById('flushMyReviewBtn');

 // Function to toggle visibility of delete review button based on currentUser and existing reviews
function toggleDeleteReviewBtn() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser && reviews.some(r => r.reviewer === currentUser)) {
        flushMyReviewBtn.style.display = 'block';
    } else {
        flushMyReviewBtn.style.display = 'none';
    }
}

// Initial toggle on page load
toggleDeleteReviewBtn();

flushMyReviewBtn.addEventListener('click', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('No current user found. Please submit a review first.');
        return;
    }
    // Show custom delete confirmation modal for bulk delete
    showBulkDeleteConfirmModal();
});

// Show bulk delete confirmation modal and handle confirm/cancel
const bulkDeleteConfirmModal = document.createElement('div');
bulkDeleteConfirmModal.id = 'bulkDeleteConfirmModal';
bulkDeleteConfirmModal.className = 'modal';
bulkDeleteConfirmModal.innerHTML = `
    <div class="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete all your reviews?</p>
        <div class="modal-buttons">
            <button id="confirmBulkDeleteBtn" class="confirm-btn">Yes, Delete All</button>
            <button id="cancelBulkDeleteBtn" class="cancel-btn">Cancel</button>
        </div>
    </div>
`;
document.body.appendChild(bulkDeleteConfirmModal);

const confirmBulkDeleteBtn = document.getElementById('confirmBulkDeleteBtn');
const cancelBulkDeleteBtn = document.getElementById('cancelBulkDeleteBtn');

function showBulkDeleteConfirmModal() {
    bulkDeleteConfirmModal.style.display = 'block';
}

confirmBulkDeleteBtn.addEventListener('click', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // Remove all reviews by current user
        reviews = reviews.filter(r => r.reviewer !== currentUser);
        // Update localStorage
        localStorage.setItem('reviews', JSON.stringify(reviews));
        // Reload reviews
        loadReviews();
        // Hide the button after deletion
        toggleDeleteReviewBtn();
    }
    bulkDeleteConfirmModal.style.display = 'none';
});

cancelBulkDeleteBtn.addEventListener('click', () => {
    bulkDeleteConfirmModal.style.display = 'none';
});

// Close modal when clicking outside modal content
window.addEventListener('click', (event) => {
    if (event.target === bulkDeleteConfirmModal) {
        bulkDeleteConfirmModal.style.display = 'none';
    }
});

// Star rating selection
starRating.forEach(star => {
    star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'));
        selectedRating = value;
        ratingInput.value = value;
        
        starRating.forEach((s, index) => {
            if (index < value) {
                s.classList.add('active');
                s.textContent = '★';
            } else {
                s.classList.remove('active');
                s.textContent = '☆';
            }
        });
    });
});

 // Form submission
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(reviewForm);
    const newReview = {
        rating: parseInt(formData.get('rating')),
        content: document.getElementById('reviewContent').value,
        reviewer: document.getElementById('reviewerName').value,
        location: document.getElementById('reviewerLocation').value,
        product: document.getElementById('productName').value || '',
        date: "Just now"
    };

    if (newReview.rating === 0) {
        alert('Please select a rating');
        return;
    }

    if (!newReview.content || !newReview.reviewer || !newReview.location) {
        alert('Please fill in all required fields');
        return;
    }

    // Save current user to localStorage
    localStorage.setItem('currentUser', newReview.reviewer);

    // Add new review to the beginning of the array
    reviews.unshift(newReview);

    // Save updated reviews array to localStorage
    localStorage.setItem('reviews', JSON.stringify(reviews));

    // Reset form
    reviewForm.reset();
    starRating.forEach(star => {
        star.classList.remove('active');
        star.textContent = '☆';
    });
    selectedRating = 0;
    ratingInput.value = 0;

    // Reload reviews
    visibleReviews += 1;
    loadReviews();

    // Toggle delete review button visibility
    toggleDeleteReviewBtn();

    // Show the new review
    showModal(newReview);
});

// Initial load
loadReviews();
