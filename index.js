const form = document.getElementById("weatherForm");
const resultDiv = document.getElementById("weatherResult");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const cityInput = document.getElementById("cityInput").value.trim();
  resultDiv.innerHTML = "";

  if (!cityInput) {
    resultDiv.innerHTML =
      '<div class="alert alert-danger">Ingrese una ciudad!</div>';
    return;
  }

  const apiKey = "d49f768bd5ea4f249972455f214cadfe";
  const cities = cityInput.split(",").map(city => city.trim()).filter(city => city !== "");
  if (cities.length === 0) {
    resultDiv.innerHTML = '<div class="alert alert-danger">Invalid input!</div>';
    return;
  }

  const fetchPromises = cities.map(city => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`No se encontró la ciudad: "${city}"`);
        }
        return response.json();
      })
      .then(data => {
        return `
          <div class="card result-card p-3 mb-3">
            <div class="card-body text-center">
              <h5 class="card-title">${data.name}, ${data.sys.country} <i class="fas fa-map-marker-alt text-info"></i></h5>
              <p class="mb-2"><i class="fas fa-temperature-high text-danger"></i> <strong>${data.main.temp}°C</strong></p>
              <p class="mb-2"><i class="fas fa-cloud text-primary"></i> ${data.weather[0].description}</p>
              <p class="mb-0"><i class="fas fa-tint text-info"></i> Humidity: ${data.main.humidity}%</p>
            </div>
          </div>
        `;
      })
      .catch(error => `<div class="alert alert-danger">${error.message}</div>`);
  });

  Promise.all(fetchPromises)
    .then(results => {
      resultDiv.innerHTML = results.join("");
    })
    .catch(error => {
      resultDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    });
});
