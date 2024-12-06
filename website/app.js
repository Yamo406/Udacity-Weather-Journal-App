// Personal API Key for OpenWeatherMap API
const baseURL = `http://api.openweathermap.org/data/2.5/forecast?zip=`
const apiKey = ',&appid=376d61f42804c1c1d176728431641772&units=imperial'


function getCurrentDate() {
    return new Date().toLocaleDateString('en-US', {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
    })
}

// Event listener to add function to existing HTML DOM element
const generateButton = document.querySelector('#generate');
generateButton.addEventListener('click', fetchWeatherData);


/* Function called by event listener */
function fetchWeatherData(e) {
    const userZipCode = document.querySelector('#zip').value;
    const feeling = document.querySelector('#feelings').value;

    getWeatherData(baseURL, userZipCode, apiKey)
        .then(function (apiData) {
            postWeatherData('/add', {
                temp: apiData.list[0].main.temp,
                date: getCurrentDate(),
                feel: feeling,
            })
        })
        .then(retrieveAppData)
        .catch(error => console.error(error))
        ;

}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, userZipCode, apiKey) => {
    const res = await fetch(baseURL+userZipCode+apiKey)
    try {
        if (!res.ok) {
            throw new Error(`Response Status: ${res.status}`);
        }
        const apiData = await res.json();
        console.log(apiData);
        return apiData;

    } catch (error) {
        console.error("Error fetching weather Data:", error);
    }
}

/* Function to POST data */
const postWeatherData = async (url = ' ', data = {}) => {
    console.log(data);
    // const res = await fetch(url, {
    const res = await fetch("http://localhost:9000/add", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await res.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.error("Error posting weather Data:", error);
    }
}


/* Function to GET Project Data */
const retrieveAppData = async () =>{
    const req = await fetch('http://localhost:9000/all');
    try {
        // Transform into JSON
        const allData = await req.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.querySelector('#temp').innerHTML = `${Math.round(allData.temp)} degrees`;
        document.querySelector('#content').innerHTML = allData.feel;
        document.querySelector("#date").innerHTML = allData.date;
    }
    catch(error) {
        console.error("Error in retrieving the Data: ", error);
    // appropriately handle the error
    }
}

