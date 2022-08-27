const startTime = () => {
    let mes = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ]
    let dia = [
        "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
    ]

    const today = new Date();
    let hour = today.getHours().toString().padStart(2, "0");
    let min = today.getMinutes().toString().padStart(2, "0");
    let sec = today.getSeconds().toString().padStart(2, "0");
    let month = mes[today.getMonth()];
    let day = dia[today.getDay()];

    document.getElementById('date-extend').innerHTML = day + ", " + today.getDate() + " " + month + " " + today.getFullYear();
    document.getElementById('date').innerHTML = new Date().toLocaleDateString().replace("/20", "/");
    document.getElementById('clock').innerHTML = "&nbsp&nbsp" + hour + ":" + min;
    setTimeout(startTime, 1000);
}

const greetingMessage = () => {
    let h = new Date().getHours();
    function message() {
        if (h <= 5) return 'Boa madrugada';
        if (h < 12) return 'Bom dia';
        if (h < 18) return 'Boa tarde';
        return 'Boa noite';
    }
    document.getElementById('title-startpage').innerHTML = message() + " !";

}

const weather = () => {
    $.get("https://api.openweathermap.org/data/2.5/weather?lat=-22.815929&lon=-45.193279&units=metric&lang=pt_br&appid=27e61055646f94edc57351064e636558",
        (status, data, response) => {
            let temp = status.main.temp.toString().replace(".",",");
            let description = status.weather[0].description;
            let humidity = status.main.humidity;
            let iconID = status.weather[0].icon;
            let iconURL = "http://openweathermap.org/img/wn/" + iconID + "@2x.png";

            console.log("status: " + JSON.stringify(status));
            console.log("data: " + data);
            if (data.toString() === 'success') {
                console.log(temp);
                console.log(humidity);
                console.log(description);
                console.log(iconURL);
                console.log($("#weather-icon"));
                $("#weather-icon").html('<img src="' + iconURL + '" alt="' + description + '" title="' + description + '" width="60px" height="60px">');
                $("#weather-temp").html(temp +"°C");
                $("#weather-humi").html(humidity+"%");
                console.log("Entrou");

            } else {
                console.log("Error openweather");
            }
        }

    );

}


const start = () => {
    startTime();
    greetingMessage();
    weather();

}
window.addEventListener("DOMContentLoaded", start);