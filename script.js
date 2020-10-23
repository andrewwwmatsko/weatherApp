const api = {
    key: 'de22b582d68a123948d7d55db8dee5a5',
    baseurl:'https://api.openweathermap.org/data/2.5/'
}
const searchBox = document.querySelector('.search')
searchBox.addEventListener('keypress', setQuerry)

const now = new Date()
const date = document.querySelector('.location .date')
date.innerText = dateBuilder(now)

function setQuerry(e) {
    if(e.keyCode === 13){
    getResponse(searchBox.value)
    searchBox.value=''
    }
}

function getResponse(querry) {
    fetch(`${api.baseurl}weather?q=${querry}&units=metric&appid=${api.key}`)
    .then(weather =>{
        return weather.json()
    })
    .then(displayResponse)
}

function displayResponse(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city')
    city.innerText = `${weather.name},  ${weather.sys.country}` 

    let now = new Date()
    let date = document.querySelector('.location .date')
    date.innerText = dateBuilder(now)

    let temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;C</span>`

    let weatherDesc = document.querySelector('.current .weather')
    weatherDesc.innerText = `${weather.weather[0].main}`

    let hilow = document.querySelector('.current .hi-low')
    hilow.innerHTML = `min ${Math.round(weather.main.temp_min)}&deg;C / max ${Math.round(weather.main.temp_max)}&deg;C`
}
function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'Aplril', 'May','June', 'July', 'August', 'September', 'October', 'November', 'December']
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()
    return `${day} ${date} ${month} ${year}`
}
