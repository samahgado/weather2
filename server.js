// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000 ;
const server = app.listen( port , () =>{

    console.log("server running"); 
    console.log("running on localhost:" + (port));
})
console.log("hi");

//request to update UI
app.get('/sendData', (requeest,response) => {
    
    response.send(projectData);
   

} )


//post request        
app.post('/postData', (req,res) =>{
    let data = req.body;
     console.log(data);
    projectData["date"] = data.date ;
    projectData["temperture"] = data.temperture ;
    projectData["feeling"] = data.feeling ;
    res.send(projectData) ;  

})

