const imgBackground =  document.querySelector('#background-img');
const container =  document.querySelector('.container');
const searchBox =  document.querySelector('.search-box button');
const weatherBox =  document.querySelector('.weather-box');
const weatherDetails =  document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

const image = document.querySelector('.weather-box img');
const temperature = document.querySelector('.weather-box .temperature');
const descriptionElement = document.querySelector('.weather-box .description');
const humidityElement = document.querySelector('.weather-details .humidity span');
const windElement = document.querySelector('.weather-details .wind span');

searchBox.addEventListener('click', queryApi);

async function queryApi() {

    const APIKey = '80b626b94dc8c81bfd23911396d4e3dd';

    const queryCity = document.querySelector('.search-box input').value;

    if (queryCity === '') {
        alert('Please write a city to fetch');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=metric&appid=${APIKey}`

    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);

        if (data.cod ==='404') {
            cityHide.textContent = queryCity;   
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            imgBackground.style.background = "url('/assets/img/background2.jpg')"
            imgBackground.style.backgroundSize = "cover"
            imgBackground.style.backgroundPosition = "center"
            return;
        }

        if (cityHide.textContent === queryCity) {
            return;
        } else {
            cityHide.textContent = queryCity;

            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove('active');
            }, 5000);

            const { main: { temp, humidity }, wind: { speed }, weather: [ { main, icon, description } ] } = data;
            console.log(icon);
            
            switch (main) {
                case 'Clear':
                    image.src = "/assets/img/clear_1.png"
                    imgBackground.style.background = "url('/assets/img/fondo-clear.jpg')"
                    imgBackground.style.backgroundSize = "cover"
                    imgBackground.style.backgroundPosition = "center"
                    break;
                case 'Rain':
                    image.src = '/assets/img/rain_1.png'
                    imgBackground.style.background = "url('/assets/img/fondo-rain.jpg')"
                    imgBackground.style.backgroundSize = "cover"
                    imgBackground.style.backgroundPosition = "center"
                    break;
                case 'Snow':
                    image.src = '/assets/img/snow.png'
                    imgBackground.style.background = "url('/assets/img/fondo-snow.jpg')"
                    imgBackground.style.backgroundSize = "cover"
                    imgBackground.style.backgroundPosition = "center"
                    break;
                case 'Clouds':
                    image.src = '/assets/img/cloud_1.png'
                    imgBackground.style.background = "url('/assets/img/fondo-cloud.jpg')"
                    imgBackground.style.backgroundSize = "cover"
                    imgBackground.style.backgroundPosition = "center"
                    break;
                case 'Mist':
                    image.src = '/assets/img/mist_1.png'
                    imgBackground.style.background = "url('/assets/img/fondo-mist.jpg')"
                    imgBackground.style.backgroundSize = "cover"
                    imgBackground.style.backgroundPosition = "center"
                    break;
                case 'Haze':
                    image.src = '/assets/img/mist_1.png'
                    imgBackground.style.background = "url('/assets/img/fondo-haze.jpg')"
                    imgBackground.style.backgroundSize = "cover"
                    imgBackground.style.backgroundPosition = "center"
                    break;
            
                default:
                    image.src = '/assets/img/cloud_1.png.png'
                    imgBackground.style.background = "url('/assets/img/background2.jpg')"
                    imgBackground.style.backgroundSize = "cover"
                    imgBackground.style.backgroundPosition = "center"
                    break;
            }

            cityHide.style.display = 'block';
    
            temperature.innerHTML = `${parseInt(temp)}<span>°C</span>`;
            descriptionElement.innerHTML = `${description}`;
            humidityElement.innerHTML = `${humidity}%`;
            windElement.innerHTML = `${parseInt(speed)}Km/h`;

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const theCloneInfoWeather = infoWeather.cloneNode(true);
            const theCloneInfoHumidity = infoHumidity.cloneNode(true);
            const theCloneInfoWind = infoWind.cloneNode(true);

            theCloneInfoWeather.id = 'clone-info-weather';
            theCloneInfoWeather.classList.add('active-clone');
            
            theCloneInfoHumidity.id = 'clone-info-humidity';
            theCloneInfoHumidity.classList.add('active-clone');

            theCloneInfoWind.id = 'clone-info-wind';
            theCloneInfoWind.classList.add('active-clone');

            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", theCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", theCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", theCloneInfoWind);
            }, 2200);   

            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoWeatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
            const cloneInfoWindFirst = cloneInfoWind[0];

            if (totalCloneInfoWeather > 0) {
                cloneInfoWeatherFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                }, 2200);
            }
        }

    } catch (error) {
        alert(error);
    }
}



// OTRA FORMA DESDE EL EVENTO CLICK
// searchBox.addEventListener('click', () => {
    
//     const APIKey = '80b626b94dc8c81bfd23911396d4e3dd';
//     // const queryCity = document.querySelector('.search-box input').value;

//     if (queryCity === '') {
//         alert('Please write a city to fetch');
//         return;
//     }

//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&appid=${APIKey}&units=metric`)
//     .then(response => response.json())
//     .then(data => {

//         if (data.cod ==='404') {
//             cityHide.textContent = queryCity;   
//             container.style.height = '400px';
//             weatherBox.classList.remove('active');
//             weatherDetails.classList.remove('active');
//             error404.classList.add('active');
//             return;
//         }   
        
//         const image = document.querySelector('.weather-box img');
//         const temperature = document.querySelector('.weather-box .temperature');
//         const descriptionElement = document.querySelector('.weather-box .description');
//         const humidityElement = document.querySelector('.weather-details .humidity span');
//         const windElement = document.querySelector('.weather-details .wind span');

//         if (cityHide.textContent === queryCity) {
//             return;
//         } else {
//             cityHide.textContent = queryCity;

//             container.style.height = '555px';
//             container.classList.add('active');
//             weatherBox.classList.add('active');
//             weatherDetails.classList.add('active');
//             error404.classList.remove('active');

//             setTimeout(() => {
//                 container.classList.remove('active');
//             }, 5000);

//             const { main: { temp, humidity }, wind: { speed }, weather: [ { main, icon, description } ] } = data;
        
//             switch (main) {
//                 case 'Clear':
//                     image.src = "/assets/img/clear_1.png"
//                     console.log('Clear weather');
//                     break;
//                 case 'Rain':
//                     image.src = '/assets/img/rain_1.png'
//                     break;
//                 case 'Snow':
//                     image.src = '/assets/img/snow.png'
//                     break;
//                 case 'Clouds':
//                     image.src = '/assets/img/cloud_1.png'
//                     break;
//                 case 'Mist':
//                     image.src = '/assets/img/mist_1.png'
//                     break;
//                 case 'Haze':
//                     image.src = '/assets/img/mist_1.png'
//                     break;
            
//                 default:
//                     image.src = '/assets/img/cloud_1.png.png'
//                     break;
//             }

//             cityHide.style.display = 'block';
    
//             temperature.innerHTML = `${parseInt(temp)}<span>°C</span>`;
//             descriptionElement.innerHTML = `${description}`;
//             humidityElement.innerHTML = `${humidity}%`;
//             windElement.innerHTML = `${parseInt(speed)}Km/h`;

//             const infoWeather = document.querySelector('.info-weather');
//             const infoHumidity = document.querySelector('.info-humidity');
//             const infoWind = document.querySelector('.info-wind');

//             const theCloneInfoWeather = infoWeather.cloneNode(true);
//             const theCloneInfoHumidity = infoHumidity.cloneNode(true);
//             const theCloneInfoWind = infoWind.cloneNode(true);

//             theCloneInfoWeather.id = 'clone-info-weather';
//             theCloneInfoWeather.classList.add('active-clone');
            
//             theCloneInfoHumidity.id = 'clone-info-humidity';
//             theCloneInfoHumidity.classList.add('active-clone');

//             theCloneInfoWind.id = 'clone-info-wind';
//             theCloneInfoWind.classList.add('active-clone');

//             setTimeout(() => {
//                 infoWeather.insertAdjacentElement("afterend", theCloneInfoWeather);
//                 infoHumidity.insertAdjacentElement("afterend", theCloneInfoHumidity);
//                 infoWind.insertAdjacentElement("afterend", theCloneInfoWind);
//             }, 2200);   

//             const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
//             const totalCloneInfoWeather = cloneInfoWeather.length;
//             const cloneInfoWeatherFirst = cloneInfoWeather[0];

//             const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
//             const cloneInfoHumidityFirst = cloneInfoHumidity[0];

//             const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
//             const cloneInfoWindFirst = cloneInfoWind[0];

//             if (totalCloneInfoWeather > 0) {
//                 cloneInfoWeatherFirst.classList.remove('active-clone');
//                 cloneInfoHumidityFirst.classList.remove('active-clone');
//                 cloneInfoWindFirst.classList.remove('active-clone');

//                 setTimeout(() => {
//                     cloneInfoWeatherFirst.remove();
//                     cloneInfoHumidityFirst.remove();
//                     cloneInfoWindFirst.remove();
//                 }, 2200);
//             }
//         }

//     });

// });
