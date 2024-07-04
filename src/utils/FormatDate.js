const FormatDate = (isoDate)=>{
    const monthsText = {
        "01": "Enero", 
        "02": "Febrero", 
        "03": "Marzo", 
        "04": "Abril", 
        "05": "Mayo", 
        "06": "Junio", 
        "07": "Julio", 
        "08": "Agosto", 
        "09": "Septiembre", 
        "10": "Octubre", 
        "11": "Noviembre", 
        "12": "Diciembre"
    }
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const formattedDate = `${day}-${monthsText[month]}-${year}`
    return formattedDate
}
function DateFormat(date) {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = { FormatDate, DateFormat }