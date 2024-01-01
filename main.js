function searchDoctors() {
    const cityInput = document.getElementById("cityInput").value;
    const locationInfo = document.getElementById("locationInfo");

    if (!cityInput) {
        alert("Please enter a city name.");
        return;
    }

    // Replace this with your actual data or API call
    const doctorLocations = [
        { name: "Doctor A", lat: 20.1, lng: 85.1 },
        { name: "Doctor B", lat: 20.2, lng: 85.2 },
        { name: "Clinic C", lat: 20.3, lng: 85.3 },
        // Add more locations as needed
    ];

    // Display location information
    locationInfo.textContent = cityInput;

    // Clear existing map
    const mapContainer = document.getElementById("map");
    mapContainer.innerHTML = "";

    // Display new map with markers
    const map = L.map('map').setView([20.0, 85.0], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    doctorLocations.forEach(location => {
        L.marker([location.lat, location.lng]).addTo(map).bindPopup(location.name);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const doctorListElement = document.getElementById('doctorList');

    // Dummy data (replace with actual data or fetch from a server)
    const bestDoctorsData = [
        { name: 'Dr. John Smith', specialization: 'Cardiologist' },
        { name: 'Dr. Emily Johnson', specialization: 'Pediatrician' },
        { name: 'Dr. Michael Davis', specialization: 'Dermatologist' },
        // Add more doctors as needed
    ];

    // Display the list of best doctors
    bestDoctorsData.forEach(doctor => {
        const listItem = document.createElement('li');
        listItem.textContent = `${doctor.name} - ${doctor.specialization}`;
        doctorListElement.appendChild(listItem);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const brandListElement = document.getElementById('brandList');

    // Dummy data (replace with actual data or fetch from a server)
    const sponsoredBrandsData = [
        'Brand A',
        'Brand B',
        'Brand C',
        'Brand D',
        'Brand E',
        // Add more brands as needed
    ];

    // Display the list of sponsored brands
    sponsoredBrandsData.forEach(brandName => {
        const brandCard = document.createElement('div');
        brandCard.classList.add('brandCard');
        brandCard.textContent = brandName;
        brandListElement.appendChild(brandCard);
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const insurancePlansElement = document.getElementById('insurancePlans');

    // Dummy data (replace with actual data or fetch from a server)
    const insurancePlansData = [
        { name: 'Plan A', coverage: 'Comprehensive coverage', cost: '$100/month' },
        { name: 'Plan B', coverage: 'Basic coverage', cost: '$75/month' },
        { name: 'Plan C', coverage: 'Specialized coverage', cost: '$120/month' },
        // Add more plans as needed
    ];

    // Display the list of insurance plans
    insurancePlansData.forEach(plan => {
        const insuranceCard = document.createElement('div');
        insuranceCard.classList.add('insuranceCard');
        insuranceCard.innerHTML = `<h3>${plan.name}</h3>
                                   <p><strong>Coverage:</strong> ${plan.coverage}</p>
                                   <p><strong>Cost:</strong> ${plan.cost}</p>`;
        insurancePlansElement.appendChild(insuranceCard);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const reviewsListElement = document.getElementById('reviewsList');
    const reviewInput = document.getElementById('reviewInput');

    function addReview() {
        const reviewText = reviewInput.value;
        if (reviewText.trim() !== '') {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('reviewCard');
            reviewCard.textContent = reviewText;
            reviewsListElement.appendChild(reviewCard);
            reviewInput.value = '';
        }
    }

    // You can add default reviews or fetch reviews from a server here.

    window.addReview = addReview;
});

start_game();