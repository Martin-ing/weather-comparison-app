const form = document.getElementById("weatherForm");
const resultDiv = document.getElementById("weatherResult");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = document.getElementById("cityInput").value.trim();
  resultDiv.innerHTML = "";

  if (!city) {
    resultDiv.innerHTML =
      '<div class="alert alert-danger">Ingrese el nombre de una ciudad!</div>';
    return;
  }

  try {
    const apiKey = "d49f768bd5ea4f249972455f214cadfe";
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("La ciudad no se encontro");
    }

    const data = await response.json();

    resultDiv.innerHTML = `
      <div class="card result-card p-3">
        <div class="card-body text-center">
          <h5 class="card-title">${data.name}, ${data.sys.country} <i class="fas fa-map-marker-alt text-info"></i></h5>
          <p class="mb-2"><i class="fas fa-temperature-high text-danger"></i> <strong>${data.main.temp}°C</strong></p>
          <p class="mb-2"><i class="fas fa-cloud text-primary"></i> ${data.weather[0].description}</p>
          <p class="mb-0"><i class="fas fa-tint text-info"></i> Humedad: ${data.main.humidity}%</p>
        </div>
      </div>
    `;
  } catch (error) {
    resultDiv.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  }
});
