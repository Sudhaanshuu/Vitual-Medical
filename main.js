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