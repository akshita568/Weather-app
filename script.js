const apikey="063ef7dca0ee2c3c86071046775a78f3"; //used open weather map API

const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input")//these are class names inside parenthesis of queryselector
const searchbtn = document.querySelector(".search button")

const weathericon = document.querySelector(".weather-icon")


async function checkweather(city) {
    const response=await fetch(apiurl + city + `&appid=${apikey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        
    
        var data = await response.json()

   

        document.querySelector(".city").innerHTML = normalizeCityName(data.name);
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity      +"%";
        document.querySelector(".wind").innerHTML = data.wind.speed +" km/     hr";


        if(data.weather[0].main=="Clouds"){
           weathericon.src = "images/clouds.png";
        }

        else if(data.weather[0].main=="Clear"){
           weathericon.src = "images/clear.png";
        }

        else if(data.weather[0].main=="rain"){
           weathericon.src = "images/rain.png";
        }

        else if(data.weather[0].main=="mist"){
           weathericon.src = "images/mist.png";
        }

        else if(data.weather[0].main=="snow"){
           weathericon.src = "images/snow.png";
        }

        else if(data.weather[0].main=="drizzle"){
           weathericon.src = "images/drizzle.png";
        }

        document.querySelector(".weather").style.display = "block"//this is to only display the weather when the city is searched(we used display =none in css but we need it to apply only to the default settings)
        document.querySelector(".error").style.display = "none"; 

       function normalizeCityName(name) {
           return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[āīū]/g, function(c) {
           const map = { 'ā': 'a', 'ī': 'i', 'ū': 'u' };
           return map[c] || c;
        });
}


    }
}

searchbtn.addEventListener("click", ()=>{  //to activate the searc when clicked on search image
   checkweather(searchbox.value);
})


searchbox.addEventListener("keypress", function(event) {  //to activate search by enter
    if(event.key === "Enter") {
        checkweather(searchbox.value.trim());
    }
});