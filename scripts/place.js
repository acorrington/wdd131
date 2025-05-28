const temperature = document.querySelector("#temperature").textContent; // °F
const windSpeed = document.querySelector("#wind-speed").textContent; // mph

const tempNumber = parseFloat(temperature);
const windNumber = parseFloat(windSpeed);
if (isNaN(tempNumber) || isNaN(windNumber)) {
    console.error("Invalid temperature or wind speed values.");
}

function calculateWindChill(temp, wind) {
    return 35.74 + 0.6215 * temp - 35.75 * Math.pow(wind, 0.16) + 0.4275 * temp * Math.pow(wind, 0.16);
}

function shouldDisplayWindChill(temp, wind) {
    return temp <= 50 && wind > 3;
}

function displayWindChill() {
    const windChillElement = document.querySelector('#wind-chill');
    
    if (windChillElement) {
        let windChillValue;
        
        if (shouldDisplayWindChill(temperature, windSpeed)) {
            const windChill = calculateWindChill(temperature, windSpeed);
            windChillValue = `${Math.round(windChill)}°F`;
        } else {
            windChillValue = "N/A";
        }
        
        windChillElement.textContent = windChillValue;
    }
}

document.addEventListener('DOMContentLoaded', displayWindChill);