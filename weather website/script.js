
async function getWeather() {
    const city = document.getElementById('city').value;
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const apiKey = 'fa3ce1902c0c4589b7645011240507'; 
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayWeather(data);
        } else {
            handleApiError(data);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data');
    }
}

function displayWeather(data) {
    console.log(data); 

    const weatherContainer = document.getElementById('weather');
    if (data && data.location && data.current) {
        weatherContainer.innerHTML = `
            <div class="weather-item"><strong>City:</strong> ${data.location.name}</div>
            <div class="weather-item"><strong>Temperature:</strong> ${data.current.temp_c}°C</div>
            <div class="weather-item"><strong>Weather:</strong> ${data.current.condition.text}</div>
            <div class="weather-item"><strong>Humidity:</strong> ${data.current.humidity}%</div>
            <div class="weather-item"><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</div>
        `;
    } else {
        alert('Error: Invalid data structure received');
    }
}

function handleApiError(data) {
    if (data.error && data.error.message) {
        alert(`Error: ${data.error.message}`);
    } else {
        alert('An unknown error occurred');
    }
}
