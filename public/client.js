//to do: make butAdd, butRemove etc in js, corresponds to the pop up menu. Replace coords with geonameid by city. Make buttons work (how?). 

const BASE_URL =
  "https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=x&ss=on&mf=on&c=on&geo=geoname&geonameid=6174041&m=50"; //Sao Paolo changed to Victoria info for a year
const url_shabbat = "https://www.hebcal.com/shabbat/?cfg=json&geonameid=6174041&m=50&b=18" //Shabbat times for Sao Paolo changed to Victoria(change number after ... id to vhange city to Victoria)
const url_datecon = "https://www.hebcal.com/converter/?cfg=json&gy=2011&gm=6&gd=2&g2h=1" //worldwide date converter
const url_ft = BASE_URL; //references the BASE URL
//https://github.com/hebcal/dotcom/blob/master/hebcal.com/dist/cities2.txt ->Shows all the geo name id's for all the cities on Hebcal

var id=6174041;
//make urls (queries) from api for indivisual things like candles, fasts, holidays etc
// geo=geoname&geonameid=6174041 ->Victoria according to geonames dot org
const calendarApp = {
  selectedLocations: {},
  addDialogContainer: document.getElementById("addDialogContainer")
};
//const url = "https://randomuser.me/api/?results=10";

document.getElementById("content").innerHTML +=
      "<h1>Jewish Calendar PWA</h1>" 
      //

// fetch
// more info here: https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
fetch(url_ft)
  .then(resp => resp.json()) // Transform the data into json
  .then(function(data) {
  
  
    //playing with pulling lines of JSON 
    //examples of pulling JSON from the server
   document.getElementById("content").innerHTML += "<h2>"+ data.title + "</h2>";
  
  
  function holidays() { 
    fetch(url_holiday)
  .then(resp => resp.json()) // Transform the data into json
  .then(function(data){
   document.getElementById("content").innerHTML +=
      data.items[2].title + "<br>";
  })
  
  function shabbat(){
    fetch(url_shabat)
  .then(resp => resp.json()) // Transform the data into json
  .then(function(data) {document.getElementById("content").innerHTML +=
      data.items[56].hebrew + "<br>";}) //hebrew "new shabbat"
    
  }
    
    function init() {
      document.getElementById("butAdd").addEventListener("click", toggleAddDialog);
      document
    .getElementById("butDialogCancel")
    .addEventListener("click", toggleAddDialog);
  document
    .getElementById("butDialogAdd")
    .addEventListener("click", addLocation);
    }
  
  
  /*
  
    
    document.getElementById("content").innerHTML +=
      data.items[3].title + "<br>"; //Rosh Chodesh Sh'vat
    
   
  document.getElementById("content").innerHTML +=
      data.items[7].hebrew + "<br>"; //hadlakat nerot
  

    for (var i = 0; i < data.items.length; i++) {
      var output = document.getElementById("card");
      output.innerHTML += "<div>" + data.items[i].title + "</div>";
    }
    */
    //end of playing with JSON

  document.getElementById("content").innerHTML += "<pre>" + JSON.stringify(data, undefined, 2) /*this hides the huge data list*/ +
     "<br><br></pre>";
  
  
  })
  .catch(function(error) {
    document.getElementById("content").innerHTML +=
      "Error with jewish calendar API";
  });
