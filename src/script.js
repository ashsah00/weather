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

  let dd = document.querySelector(".d");
  //dd.innerHTML =
  console.log(`${new Date(response.data.time * 1000)} ,`);

  /* let emoji = document.querySelector(".icon");
  emoji.innerHTML = response.data.condition.icon; */
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
}

//event listener comes from button
let sub = document.querySelector("#srchb");
sub.addEventListener("click", cityEn);

chgTemp("Manila");
