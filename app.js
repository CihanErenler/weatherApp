const api = {
    key : '747f91f40e838080da5aa9e845f525c3',
    url : 'https://api.openweathermap.org/data/2.5/'
}

document.querySelector('.search-icon').addEventListener('click', () => {

    let city = document.querySelector('.search-box').value.trim();
    document.querySelector('.search-box').value = "";

    if(city === ""){
        return;
    }{
        getResult(city)
        .then(resolve => {
            calculateTime(resolve)
            manageUi(resolve)
        })
        .catch(err => console.log(err));
    }
})

window.addEventListener('load',() => {
    getResult('Helsinki')
    .then(resolve => {
        calculateTime(resolve)
        manageUi(resolve)
    })
    .catch(err => console.log(err));
})

document.body.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){

        let city = document.querySelector('.search-box').value.trim();
        document.querySelector('.search-box').value = "";

        if(city === ""){
            return;
        }{
            getResult(city)
            .then(resolve => {
                calculateTime(resolve)
                manageUi(resolve)
            })
            .catch(err => console.log(err));
        }
    }
})

async function getResult(city){
    const data = await fetch(`${api.url}weather?q=${city}&units=metric&appid=${api.key}`);
    const jsonData = await data.json();

    return jsonData;
}

function calculateTime(data){
    let d = new Date();
    let citytime = data.timezone * 1000;
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    let nd = new Date(citytime + utc);

    return nd.getHours();

}

function manageUi(data){
    let hour = calculateTime(data);
    console.log('orada saat : '+hour)

    if(hour < 12){
        document.querySelector('.card').style.background = "linear-gradient(to bottom,#1c283a, #ca7a6f)"
    }else if(hour >= 12 && hour < 18){
        if(Math.round(data.main.temp) < 0){
            document.querySelector('.card').style.background =  "linear-gradient(to bottom,#5d718f, #838383)"
        }else{
            document.querySelector('.card').style.background =  "linear-gradient(to bottom, #e68d28,#40acf5)"
        }
    }else if(hour >= 18 && hour < 20){
        document.querySelector('.card').style.background =  "linear-gradient(to bottom,#2a283b, #c75571)"
    }else{
        document.querySelector('.card').style.background =  "linear-gradient(to bottom,#3a3f52, #249993)"
    };

    document.querySelector('.city').textContent = data.name;
    document.querySelector('.date').textContent = calculateDate();
    document.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°`;
    document.querySelector('.feels').innerHTML = `Feels like ${Math.round(data.main.feels_like)}°`;
    document.querySelector('.condition').textContent = data.weather[0].description;
    document.querySelector('.humidity').textContent = `Humidity : ${data.main.humidity}`;
    document.querySelector('.pressure').textContent = `Pressure : ${data.main.pressure}`;
 
    document.querySelector('.weather-image').setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
}

function calculateDate(){
    let d = new Date();

    let months = ['Jenuary','February','March','April','May','June','July','August','September','October','November','December'];

    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    let weekDay;
    let monthNum;
    let monthDay = d.getDate();
    let year = d.getFullYear();

    switch(d.getDay()){
        case 0 : weekDay = days[0]; break;
        case 1 : weekDay = days[1]; break;
        case 2 : weekDay = days[2]; break;
        case 3 : weekDay = days[3]; break;
        case 4 : weekDay = days[4]; break;
        case 5 : weekDay = days[5]; break;
        case 6 : weekDay = days[6]; break;
    }

    switch(d.getMonth()){
        case 0 : monthNum = months[0]; break;
        case 1 : monthNum = months[1]; break;
        case 2 : monthNum = months[2]; break;
        case 3 : monthNum = months[3]; break;
        case 4 : monthNum = months[4]; break;
        case 5 : monthNum = months[5]; break;
        case 6 : monthNum = months[6]; break;
        case 7 : monthNum = months[7]; break;
        case 8 : monthNum = months[8]; break;
        case 9 : monthNum = months[9]; break;
        case 10 : monthNum = months[10]; break;
        case 11 : monthNum = months[11]; break;
    }

    let format = `${weekDay}, ${monthNum} ${monthDay}, ${year}`

    return format;
}

const time = document.querySelector('.time');

function setClock(){

    setInterval(() => {
        let d = new Date();

        let h = check(d.getHours());
        let m = check(d.getMinutes());
        let s = check(d.getSeconds());

        let hour = [h,m,s].join(':');

        time.textContent = hour;
    },1000)
}

function check(x){
    return x < 10 ? "0"+x : x;
}

setClock();
