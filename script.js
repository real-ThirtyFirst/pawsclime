const form = document.getElementById('weather-form');
const weatherInfo = document.getElementById('weather-info');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = document.getElementById('city').value;
    const apiKey = "4f3ff9746d10bde307a74e6131c88ebb";

    try {
        // Fetch current weather
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const currentWeatherData = await currentWeatherResponse.json();

        if (currentWeatherData.cod === 200) {
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
            const forecastData = await forecastResponse.json();
            const threeDayForecast = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
            document.querySelector(".temperature-pet").innerText = currentWeatherData.main.temp;

            updatePetWarning(currentWeatherData.main.temp);

            let weatherInfoHTML = `
                <div class="card border-0 bg-transparent">
                    <div class="card-body text-white border-0">
                        <div class="rounded-5">
                          <h1 class="card-title">Weather in <span class="pawsclime display-5 fw-bold">${city}</span></h1>
                        <div class="d-flex align-items-baseline justify-content-between">
                            <h4 class="card-text">Temperature<br><span class="display-5">${currentWeatherData.main.temp}</span>°C</h4>
                            <h4 class="card-text">Description<img src="http://openweathermap.org/img/w/${currentWeatherData.weather[0].icon}.png" alt="Weather Icon"><br><span class="display-8 fw-light">${currentWeatherData.weather[0].description}</span></h4>
                        </div>
                        </div>
                        <h2 class="mt-3">Next 3 Day Forecast</h2>
            `;

            threeDayForecast.forEach(forecast => {
                const forecastDate = new Date(forecast.dt_txt);
                const forecastDay = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
                weatherInfoHTML += `
                    <div class="d-flex justify-content-between align-items-center bg-light text-dark px-3 rounded my-2">
                        <p class="w-25 text-white text-center bg-warning rounded-3">${forecastDay}</p>
                        <p class="w-30"><img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="Weather Icon"> ${forecast.weather[0].description}</p>
                        <p class="w-25">${forecast.main.temp} °C</p>
                    </div>
                `;
            });

            weatherInfoHTML += `
                    </div>
                </div>
            `;
            
            weatherInfo.innerHTML = weatherInfoHTML;
        } else {
            weatherInfo.innerHTML = '<p class="text-danger">City not found. Please try again.</p>';
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p class="text-danger">An error occurred. Please try again later.</p>';
    }
});

function updatePetWarning(temperature) {
    const petWarning = document.querySelector('.pet-warning');
    let warningMessage = '';

    if (temperature > 30) {
        warningMessage = `
            <h2 class="fw-bolder text-warning">High Temperature <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-thermometer-sun" viewBox="0 0 16 16">
            <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V2.5a.5.5 0 0 1 1 0v8.585A1.5 1.5 0 0 1 5 12.5"/>
            <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m4.243 1.757a.5.5 0 0 1 0 .707l-.707.708a.5.5 0 1 1-.708-.708l.708-.707a.5.5 0 0 1 .707 0M8 5.5a.5.5 0 0 1 .5-.5 3 3 0 1 1 0 6 .5.5 0 0 1 0-1 2 2 0 0 0 0-4 .5.5 0 0 1-.5-.5M12.5 8a.5.5 0 0 1 .5-.5h1a.5.5 0 1 1 0 1h-1a.5.5 0 0 1-.5-.5m-1.172 2.828a.5.5 0 0 1 .708 0l.707.708a.5.5 0 0 1-.707.707l-.708-.707a.5.5 0 0 1 0-.708M8.5 12a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5"/>
          </svg></h2>
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1"/>
            </svg> Tips:
                <ul>
                    <li>Always give cool water at all times. You can also give ice to keep it cold.</li>
                    <li>Regularly groom your pets to remove excess fur that can trap heat.</li>
                    <li>Give your pets a cool bath to help lower their body temperature.</li>
                    <li>Provide cooling mats or wet towels for your pets to lie on.</li>
                    <li>Set up a shallow wading pool or use a sprinkler for supervised playtime. This allows pets to cool down.</li>
                    <li>Avoid walks during the hottest part of the day. If you must go out, stick to shaded areas and keep walks short.</li>
                    <li>During extreme heat, create a cool haven for your pet indoors with air conditioning or fans.</li>
                </ul>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
                <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/></svg> Warnings:
                <ul>
                    <li>Heatstroke may encounter. Symptoms include excessive panting, vomiting, and diarrhea. Seek immediate veterinary care if suspected.</li>
                    <li>The higher the temperature, the higher the risk for very young or overweight pets.</li>
                </ul>
            </p>
        `;
    } else if (temperature < 10) {
        warningMessage = `
            <h2 class="fw-bolder text-info">Low Temperature <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-thermometer-sun" viewBox="0 0 16 16">
            <path d="M5 12.5a1.5 1.5 0 1 1-2-1.415V9.5a.5.5 0 0 1 1 0v1.585A1.5 1.5 0 0 1 5 12.5"/>
            <path d="M1 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM3.5 1A1.5 1.5 0 0 0 2 2.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0L5 10.486V2.5A1.5 1.5 0 0 0 3.5 1m5 1a.5.5 0 0 1 .5.5v1.293l.646-.647a.5.5 0 0 1 .708.708L9 5.207v1.927l1.669-.963.495-1.85a.5.5 0 1 1 .966.26l-.237.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.884.237a.5.5 0 1 1-.26.966l-1.848-.495L9.5 8l1.669.963 1.849-.495a.5.5 0 1 1 .258.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.237.883a.5.5 0 1 1-.966.258L10.67 9.83 9 8.866v1.927l1.354 1.353a.5.5 0 0 1-.708.708L9 12.207V13.5a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5"/>
          </svg></h2>
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1"/>
            </svg> Tips:
                <ul>
                    <li>Give them plenty of nutritious food to have extra energy to stay warm.</li>
                    <li>Give extra bedding to help your pet keep body heat.</li>
                    <li>Keep your pet active even during colder months. Daily walks or playtime indoors help maintain muscle mass and generate heat.</li>
                    <li>Cold weather can dry out and crack your pet's paw pads. Consider using a pet-safe paw balm to keep them moisturized and prevent discomfort.</li>
                    <li>Ensure your pet has access to fresh, unfrozen water at all times.</li>
                </ul>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-lg" viewBox="0 0 16 16">
                <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0"/></svg>Warnings:
                <ul>
                    <li>Frostbite and hypothermia are dangers, especially for small, young, or elderly pets. Signs include shivering and being slow to get up.</li>
                    <li>Some pets may need to be kept indoors during extreme cold snaps.</li>
                </ul>
            </p>
        `;
    } else {
        warningMessage = `
            <h2 class="fw-bolder text-light">Normal Temperature <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-thermometer-sun" viewBox="0 0 16 16">
            <path d="M9.5 12.5a1.5 1.5 0 1 1-2-1.415V6.5a.5.5 0 0 1 1 0v4.585a1.5 1.5 0 0 1 1 1.415"/>
            <path d="M5.5 2.5a2.5 2.5 0 0 1 5 0v7.55a3.5 3.5 0 1 1-5 0zM8 1a1.5 1.5 0 0 0-1.5 1.5v7.987l-.167.15a2.5 2.5 0 1 0 3.333 0l-.166-.15V2.5A1.5 1.5 0 0 0 8 1"/>
          </svg></h2>
            <p>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb" viewBox="0 0 16 16">
                <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1"/>
            </svg> Tips:
                <ul>
                    <li>Provide comfortable bedding. Make sure your pet has a clean and comfortable place to rest and relax, especially during normal temperature days.</li>
                    <li>Regular brushing helps remove loose fur and keeps your pet cooler by improving air circulation through their coat.</li>
                    <li>Maintain your pet's dental hygiene by brushing their teeth or providing dental chews. Good oral health can contribute to overall well-being.</li>
                    <li>Rotate your pet's toys seasonally to keep things interesting. For normal temperature days, consider introducing new chew toys or puzzle feeders that challenge them mentally.</li>
                    <li>Ensure your pet has access to fresh, clean water at all times. This is especially important as pets regulate their body temperature through panting and can become dehydrated easily.</li>
                </ul>
            </p>
        `;
    }

    petWarning.innerHTML = warningMessage;
};

// for pet feeding tracker
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feeding-form');
    const feedingRecords = document.getElementById('feeding-records');
    const deleteLastButton = document.getElementById('delete-last-record');
  
    // Load feeding records from local storage
    loadFeedingRecords();
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const petName = document.getElementById('petName').value;
      const foodType = document.getElementById('foodType').value;
      const foodAmount = document.getElementById('foodAmount').value;
      const feedingTime24 = document.getElementById('feedingTime').value;
  
      const feedingTime = convertTo12HourFormat(feedingTime24);
  
      const newRecord = {
        petName,
        foodType,
        foodAmount,
        feedingTime
      };
  
      addFeedingRecord(newRecord);
      saveFeedingRecord(newRecord);
  
      form.reset();
    });
  
    deleteLastButton.addEventListener('click', () => {
      // Delete the last record from local storage
      let records = JSON.parse(localStorage.getItem('feedingRecords')) || [];
      if (records.length > 0) {
        records.pop();
        localStorage.setItem('feedingRecords', JSON.stringify(records));
  
        // Reload the feeding records
        feedingRecords.innerHTML = '';
        loadFeedingRecords();
      }
    });
  
    function addFeedingRecord(record) {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${record.petName}</td>
        <td>${record.foodType}</td>
        <td>${record.foodAmount}</td>
        <td>${record.feedingTime}</td>
      `;
  
      feedingRecords.appendChild(newRow);
    }
  
    function saveFeedingRecord(record) {
      let records = JSON.parse(localStorage.getItem('feedingRecords')) || [];
      records.push(record);
      localStorage.setItem('feedingRecords', JSON.stringify(records));
    }
  
    function loadFeedingRecords() {
      const records = JSON.parse(localStorage.getItem('feedingRecords')) || [];
      records.forEach(record => addFeedingRecord(record));
    }
  
    function convertTo12HourFormat(time24) {
      const [hour24, minute] = time24.split(':');
      const hour12 = (hour24 % 12) || 12;
      const amPm = hour24 < 12 ? 'AM' : 'PM';
      return `${hour12}:${minute} ${amPm}`;
    }
  });
  
  