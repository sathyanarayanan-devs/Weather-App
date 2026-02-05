const tempField = document.getElementById("temp");
const locField = document.getElementById("location");
const dateField = document.getElementById("time");
const weatherField = document.getElementById("weather");
const searchField = document.getElementById("search-area");

const form = document.querySelector("form"); // better than button click
let place = "Tamil Nadu";

const API_KEY = "7e906d5158db4edc9d593055260502";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchForLocation();
});

async function fetchDetails(queryPlace) {
  try {
    // Loading state
    tempField.textContent = "Loading...";
    locField.textContent = "";
    dateField.textContent = "";
    weatherField.textContent = "";

    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
      queryPlace
    )}&aqi=no`;

    const res = await fetch(url);

    // If API returns something unexpected
    if (!res.ok) {
      throw new Error(`Request failed (${res.status})`);
    }

    const data = await res.json();

    // WeatherAPI puts errors like: { error: { message: "..." } }
    if (data.error) {
      throw new Error(data.error.message || "Location not found");
    }

    const locationName = data.location.name;
    const localTime = data.location.localtime;
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;

    uiUpdate(temp, locationName, localTime, condition);
  } catch (err) {
    showError(err.message);
  }
}

function searchForLocation() {
  const value = searchField.value.trim();

  if (value.length === 0) {
    showError("Type a location first 🙂");
    return;
  }

  place = value;
  fetchDetails(place);
  searchField.value = ""; // optional: clears input after search
}

function uiUpdate(temp, locationName, localTime, condition) {
  const [newDate, newTime] = localTime.split(" ");
  const currentDay = getDayName(new Date(newDate).getDay());

  tempField.textContent = `${Math.round(temp)}°C`;
  locField.textContent = locationName;
  dateField.textContent = `${newDate} ${newTime} (${currentDay})`;
  weatherField.textContent = condition;
}

function showError(message) {
  tempField.textContent = "—";
  locField.textContent = "Error";
  dateField.textContent = "";
  weatherField.textContent = message;
}

function getDayName(number) {
  switch (number) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "";
  }
}

// ✅ Run once on page load
fetchDetails(place);
