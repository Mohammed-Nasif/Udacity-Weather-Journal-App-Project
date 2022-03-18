/* 
 * !!! This code was written, tested, debugged, and operated by me only Muhammad Nasif, all rights reserved only to me and Udacity.
 *  Everything done in the code has its own comment above it.
*/

// The URL TO retrieve weather information from API (Country ID US)
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Personal API KEY For OpenWeatherMap API
//units=metric to get Temp in celisus
let apiKey = '&appid=9f57d44b1553e04badbf13369550c630&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
//Array of months to output months as Name of each not it's order in the year
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let newDate =  months[d.getMonth()] +' / '+ d.getDate() +' / '+ d.getFullYear();
// console.log(newDate)


// Event Listener to Generate Button on App Webpage 
document.getElementById('generate').addEventListener('click', () => {
    const zipCode = document.getElementById('zip').value;
    const catchFeelings = document.getElementById('feelings').value;
    getWeather(baseURL, zipCode, apiKey)

    .then(function(info){

        // console.log("info : ");
        // console.log(info);
        postData('http://localhost:3030/clientAddedData', {date:newDate, temp:info.main.temp, content:catchFeelings})
    })
});


// Function To Get Web API data
const getWeather = async (baseURL, zipCode, apiKey) => { 
    try {
        const apiResponse = await fetch (baseURL+zipCode+apiKey);
    // Transform into JSON
    const data = await apiResponse.json();
    // console.log("getWeather : " )
    // console.log(data)
    return data;
    }
    catch(error) {
      console.log("error:", error);
      // appropriately handle the error
    }
  };
  

// Function To Post data
const postData = async ( url = '', info = {})=> {
    // console.log("postberfore : ");
    // console.log(info);
    const response = await fetch (url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(info), // body data type must match "Content-Type" header        
  });
    try {
        //UpdateUI Function Revoke
        updateUI()

    }catch(error) {
        console.log("error:", error);
        // appropriately handle the error
    };
};


// Function to get projectdata and update UI for WebApp
const updateUI = async () => {
   const request = await fetch('http://localhost:3030/allData');
    // console.log("request : ");
    // console.log(request);
   try{
    // Transform into JSON
    const finalData = await request.json();
    // console.log("finalData");
    // console.log(finalData);
    //Get Elements of Entries in HTML by ID and Update It in the Web App
    document.getElementById('date').innerHTML = 'Date : ' + finalData.date ; 
    document.getElementById('temp').innerHTML = 'Temperature now is : ' + Math.round(finalData.temp) + '&degC'; 
    document.getElementById('content').innerHTML = 'Your feeling today is : ' + finalData.content ;

   }catch(error){
    console.log("error:", error);
    // appropriately handle the error
   };

};
// !!! Function Revoked Inside Postdate Function Above