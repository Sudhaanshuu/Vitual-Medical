// Get form values
const form = document.querySelector('#doctorReviews form');
const name = document.getElementById('reviewerName');
const review = document.getElementById('reviewText');
const rating = document.getElementById('ratingScore');

// Handle submit
form.addEventListener('submit', e => {

    // Create review
    const newReview = document.createElement('div');

    // Display review
    newReview.innerHTML = `
    <h3>${name.value} - ${rating.value} stars</h3>
    <p>${review.value}</p>
  `;

    // Add to DOM
    document.querySelector('.submitted-reviews').appendChild(newReview);

    e.preventDefault();
});