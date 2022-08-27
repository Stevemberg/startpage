let mes = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
]
let dia = [
    "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
]

const makeDate = (today) => {
    let hour = today.getHours().toString().padStart(2, "0");
    let min = today.getMinutes().toString().padStart(2, "0");
    let sec = today.getSeconds().toString().padStart(2, "0");
    let month = mes[today.getMonth()];
    let day = dia[today.getDay()];

    document.getElementById('date-extend').innerHTML = day + ", " + today.getDate() + " " + month + " " + today.getFullYear();
    document.getElementById('date').innerHTML = new Date().toLocaleDateString().replace("/20", "/");
    document.getElementById('clock').innerHTML = "&nbsp&nbsp" + hour + ":" + min;
}

const greetingMessage = (h) => {
    function message(h) {
        if (h <= 5) return 'Boa madrugada';
        if (h < 12) return 'Bom dia';
        if (h < 18) return 'Boa tarde';
        return 'Boa noite';
    }
    document.getElementById('title-startpage').innerHTML = message(h.getHours()) + " !";

}

const countdown = (today) => {
    let end = new Date(2022,10,25);
    let days = Math.ceil( (end - today) / (1000 * 60 * 60 * 24) );
    $("#countdown-number").html(days);
}

const startTimer = () => {
    $.get("https://worldtimeapi.org/api/ip", (status, data) => {
        let today = null;
        if (data.toString() === 'success') {
            today = new Date(status.datetime);
        } else {
            today = new Date();
            console.log("Error API timezone");
        }
        makeDate(today);
        greetingMessage(today);
        countdown(today);
        setTimeout(startTimer, 5000);
    });
}

const weather = () => {
    $.get("https://api.openweathermap.org/data/2.5/weather?lat=-22.815929&lon=-45.193279&units=metric&lang=pt_br&appid=27e61055646f94edc57351064e636558",
        (status, data) => {
            //console.log("status: " + JSON.stringify(status));
            if (data.toString() === 'success') {
                let temp = status.main.temp.toString().replace(".", ",");
                let description = status.weather[0].description;
                let humidity = status.main.humidity;
                let iconID = status.weather[0].icon;
                let iconURL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";
                $("#weather-icon").html('<img src="' + iconURL + '" alt="' + description + '" title="' + description + '" width="60px" height="60px">');
                $("#weather-temp").html(temp + "°C");
                $("#weather-humi").html(humidity + "%");
            } else {
                console.log("Error openweather");
            }
        }

    );

}

const start = () => {
    startTimer();
    weather();

}
window.addEventListener("DOMContentLoaded", start);