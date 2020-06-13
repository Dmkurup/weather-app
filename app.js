window.addEventListener("load", () => {
  let long;
  let lat;
  let timezone = document.querySelector(".location-timezone");
 
  let temperatureDegree = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let tempSection = document.querySelector('.temperature');
  let tempSpan = document.querySelector('.temperature span');
  let iconElement = document.querySelector(".weather-icon");


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=534da9f20aca9dfe1676a9debc407631`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {

          const temperature = data.current.temp;
          let tempInCelsius = Math.floor((temperature-32)*(5/9));

          temperatureDegree.textContent = temperature;
          
          tempSection.addEventListener("click",()=>{
            if(tempSpan.textContent==="F"){
                tempSpan.textContent=" C ";
                temperatureDegree.textContent=tempInCelsius;
            }else{
                tempSpan.textContent="F";
                temperatureDegree.textContent=temperature;
            }
            })


          timezone.textContent = data.timezone;
     
          temperatureDescription.textContent = data.current.weather[0].main;
        })
    });
  }

  function setIcons(icon) {
    const iconApi = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    fetch(iconApi).then((resp) => {});
    return iconApi;
  }
});
