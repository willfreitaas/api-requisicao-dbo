//corrigira data "YYYY-MM-DD"

const parseDateBd = (dataString) => {
    let [ano, mes, dia] = dataString.split("-");
    ano = parseInt(ano);
    mes = parseInt(mes);
    dia = parseInt(dia);

    return new Date(ano, mes - 1, dia + 1);
}

const parseTimeBd = (time) =>{
    let horas = parseInt(time.getHours()) + 3;
    let minutes = parseInt(time.getMinutes());
    let seconds = parseInt(time.getSeconds());

    horas = horas < 10 ? "0" + horas : horas;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${horas}:${minutes}:${seconds}`
}

module.exports = (parseDateBd, parseTimeBd)