const startTime = () => {
    let mes = [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ]
    let dia = [
        "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
    ]

    const today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes().toString().padStart(2, "0");
    let sec = today.getSeconds().toString().padStart(2, "0");
    let month = mes[today.getMonth()];
    let day = dia[today.getDay()];

    document.getElementById('date-extend').innerHTML = day + ", " + today.getDate() + " " + month + " " + today.getFullYear();
    document.getElementById('date').innerHTML = new Date().toLocaleDateString().replace("/20", "/");
    document.getElementById('clock').innerHTML = hour + ":" + min;
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
    document.getElementById('title-startpage').innerHTML = message() +" !";

}


const start = () => {
    startTime();
    greetingMessage();

}
window.addEventListener("DOMContentLoaded", start);