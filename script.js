let tempField = document.getElementById("temp");
let locField = document.getElementById("location");
let dateField = document.getElementById("time");
let weatherField = document.getElementById("weather");
let searchField = document.getElementById("search-area");
let searchBtn = document.querySelector("button");

searchBtn.addEventListener("click", searchForLocation);

let place = "Tamil Nadu";
const fetchDetails = async () => {
    let url = `http://api.weatherapi.com/v1/current.json?key=7e906d5158db4edc9d593055260502&q=${place}`;

    let res = await fetch(url);

    let data = await res.json();


    let locationName = data.location.name;
    let localTime = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    uiUpdate(temp,locationName,localTime,condition);
};

function searchForLocation(e){
    e.preventDefault();

    place = searchField.value;
    fetchDetails(place);
}

function uiUpdate(temp, locationName,localTime,condition){

    let newDate = localTime.split(' ')[0];
    let newtime = localTime.split(' ')[1];

    let currentDay = getDayName(new Date(newDate).getDay());

    tempField.textContent = temp;
    locField.textContent = locationName;
    dateField.textContent = `${newDate} ${newtime} ${currentDay}`;
    weatherField.textContent = condition;
}

function getDayName(number){
    switch(number){
       case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
}