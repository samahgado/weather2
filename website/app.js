/* Global Variables */
let urlWeather = "http://api.openweathermap.org/data/2.5/weather?zip=" ;
let convertTemp = "&units=metric";
let apiKey = "&appid=1050a9b08ac35f728c53bc2ead5c510c" ;
let generateBtn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//When user click on btn do performAction function:-

generateBtn.addEventListener("click" , performAction);

function performAction(e){
    let userZip = document.getElementById("zip").value;
    let userFeel = document.getElementById("feelings").value;

    //if => user doesnt enter zip code make alert, else => do perform Action function
    if (!userZip){
        alert("Enter User Zip");
    }else{
    getTempData(urlWeather,userZip,convertTemp,apiKey)
   
    .then((dataTemp) => {

        postAllData('/postData', { date: newDate , temperture : dataTemp.main.temp , feeling: userFeel})
})

.then ( () => updateUI()  )
   
}

}

//GET DATA FROM WEATHER MAB web using asnchronous js

const getTempData = async(urlWeather,userZip,convertTemp,apiKey) =>{
    // wait to fetch (url&userzip&apikey :then=>)
        const res = await fetch(urlWeather+userZip+convertTemp +apiKey);
        try {
    //convert response to json so we can access data
            const dataTemp = await res.json();
    
            console.log(dataTemp);
    
            return dataTemp;
    
            //handle the error
        }catch(error){
    
            console.log("error",error);
        }
    }

    //function to post data in server
//url=>make post request to it & data=> to post in server end point

const postAllData = async (url = "" , data = {}) => {
    const response = await fetch(url, {
     method: 'POST', 
     credentials: 'same-origin',
     //to handle data with json
     headers: {
         'Content-Type': 'application/json',
     },
    //to convert json into string for server to recieve info.
     body: JSON.stringify(data), 
   });

   try{
        return;
       //handle error
   }catch(error){
       console.log("error",error);
   }
}


//update UI
const updateUI = async () => {
    const request = await fetch('/sendData');
    try{
      const data = await request.json();
      document.getElementById('date').innerHTML ="Date: " + (data.date);
      document.getElementById('temp').innerHTML = "Temperature: " +  (data.temperture);
      document.getElementById('content').innerHTML = "I feel: " +  (data.feeling);
  
    }catch(error){
      console.log("error", error);
    }
  }
  

