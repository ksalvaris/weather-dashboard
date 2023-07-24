async function getWeatherForecast() {
    const cityInput = document.getElementById('cityInput').value;

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const weatherCardsElement = document.getElementById('weatherCards');
        weatherCardsElement.innerHTML = '';

        for (let i = 0; i < 5; i++) {
            const date = new Date(data.list[i].dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
            const temp = data.list[i].main.temp;
            const weather = data.list[i].weather[0].main;

            const cardHTML = `
                <div class="weather-card">
                    <p>${date}</p>
                    <p>${temp} °C</p>
                    <p>${weather}</p>
                </div>
            `;
            weatherCardsElement.insertAdjacentHTML('beforeend', cardHTML);
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
