function refreshWeather(response) {
  let cTemp = Math.round(response.data.temperature.current);

  let cityCur = document.querySelector("h1");
  cityCur.innerHTML = response.data.city;

  let pTemp = document.querySelector(".curTemp");
  pTemp.innerHTML = cTemp;

  let humidity = document.querySelector(".h");
  humidity.innerHTML = `${Math.round(response.data.temperature.humidity)} %`;

  let wind = document.querySelector(".w");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} m/h`;

  let cond = document.querySelector("#des");
  cond.innerHTML = response.data.condition.description;

  //parsing the date
  let date = new Date(response.data.time * 1000);

  let dd = document.querySelector(".d");
  dd.innerHTML = dateFormat(date);

  function dateFormat(date) {
    let hours = date.getHours();
    let mins = date.getMinutes();

    let allDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = allDays[date.getDay()];

    if (mins < 0) {
      mins = `0${mins}`;
    }

    return `${day} ${hours}:${mins},`;
  }

  let emoji = document.querySelector(".icon");
  emoji.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon"</img>`;
}

function chgTemp(city) {
  //make API call and update the page
  let apiKey = "d431c23aa7bd0aod0t4f840f8a543f42";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  // run this to check if apiURL is working.
  //console.log(apiUrl);

  axios.get(apiUrl).then(refreshWeather);
}

function cityEn(event) {
  event.preventDefault();
  //takes user input and changes City name

  //could use below but using API to display exact city name
  let cityIn = document.querySelector("#bar");
  /* let cityCur = document.querySelector("h1");
  cityCur.innerHTML = cityIn.value*/

  // this is the input to for the API
  chgTemp(cityIn.value); //storing the value
  getForecast(cityIn.value);
}

//forecast funtions and code
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  //make API call and update the page
  let apiKey = "d431c23aa7bd0aod0t4f840f8a543f42";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
  // run this to check if apiURL is working.
  console.log(apiUrl);

  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let fcastHtml = "";
  //analyse the response from API
  console.log(response.data);

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      fcastHtml =
        fcastHtml +
        `      <ul>
<li class="dayF">${formatDay(day.time)}</li>
<li class="iconF">

<img src="${day.condition.icon_url}"; >


</li>
<li class="mm">
<span class="max">${Math.round(
          day.temperature.maximum
        )}</span> | <span class="min">${Math.round(
          day.temperature.minimum
        )}</span>
</li>

</ul>`;
    }
  });

  let forecast = document.querySelector("#fcast");
  forecast.innerHTML = fcastHtml;
}

//event listener comes from button

let sub = document.querySelector("#srchb");
sub.addEventListener("click", cityEn);

//default
chgTemp("Manila");
getForecast("Manila");
