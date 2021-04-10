/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=dc2a1bd2c73301b5044347384104591d';
const unitMetric = '&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to a dd function to existing HTML DOM element
document.querySelector('#generate').addEventListener('click', getWeatherData);                              // Add Event Listener By Clicking on Generate Button.

/* Function called by event listener */
async function getWeatherData() {
    clearFieldData();                                                                                       // Clear Field Data For New Entry.
    const zipCode = document.querySelector('#zip').value;                                                   // Read User's Zip Code.
    const feelings = document.querySelector('#feelings').value;                                             // Read User's Feelings.

    if (!zipCode) {                                                                                         // If User Didn't Enter a Zip Code
        return alert('Please enter a zip code');                                                            // End the Function & Alert the User To Enter a Zip Code.
    }
    
    if (zipCode.length !== 5) {                                                                             // If User Enter a Zip Code Not Equals to Five Digits
        return alert('Please enter a valid zip code of 5 digit numbers');                                   // End the Function & Alert the User To Enter a Correct Zip Code.
    }

    if (!feelings) {                                                                                        // If User Didn't Enter his/her Feelings.
        return alert('Please enter your feelings');                                                         // End the Function & Alert the User To Enter his/her Feelings.
    }

    const temperature = await getTemperature(baseUrl, zipCode, apiKey, unitMetric);                         // Get Temperature From API.
    const postRequest = await postData(temperature, feelings);                                              // POST Request.

    if (postRequest.status === 'success' && temperature !== undefined) {
        UpdateDataField();                                                                                  // Update Data-Field.
    }
}

/* Function to GET Web API Data*/
async function getTemperature(baseUrl, zipCode, apiKey, unitMetric) {
    try {
        // Fetching the Weather Data from the API
        const apiData = await fetch(baseUrl + zipCode + apiKey + unitMetric);

        if (apiData.status === 404) {                                                                       // If 404 (Wrong Zip Code), No Need To Check 400 Since It Is Handled Previously.
            return alert('Please Enter a valid zip code.');                                                 // End the Function & Alert the User To Enter a Zip Code or A Correct One.
        }

        return (await apiData.json()).main.temp;
    }
    catch(error){
        console.log(error);
    }
};

/* Function to POST data */
async function postData(temperature, feelings){
    try {
        const res = await fetch('/addWeather', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                temp: temperature,
                date: newDate,
                content: feelings
            })
        })
        return await res.json();                                                                            // Return Response To Update Data-Field.
    }
    catch(error){
        console.log(error);
    }
};

/* Function to GET Project Data */
async function UpdateDataField () {
    try {
        const getData = await (await fetch('/getWeather')).json();                                          // Create Object To Get Data.
        // Update Data-Field Entery.
        document.getElementById('date').innerHTML = 'Date: '+ getData.date;
        document.getElementById('temp').innerHTML = 'Temperature: '+ getData.temp;
        document.getElementById('content').innerHTML = 'I feel: '+ getData.feelings;
    }
    catch(error){
        console.log(error);
    }
}

// Function To Clear Data Field When Clicking On Generate Button.
function clearFieldData(){
    document.getElementById('date').innerHTML = '';
    document.getElementById('temp').innerHTML = '';
    document.getElementById('content').innerHTML = '';
}
