const { invoke } = window.__TAURI__.core;


// async function fetchData() {
//    const response = await fetch("http://localhost:6969/");
//    document.getElementById("server-data").innerHTML = await response.text();

// }
let userID;
async function sendData() {

   const response = await fetch('http://localhost:6969/' , {
      method : 'POST',
      headers : {
         "Content-Type" : "text/plain"
      },
      body : timeBox.value.toString()
   });
   console.log(response);

}

function timeUp() {
   document.getElementById("time-up").innerHTML = "TIME UP!!!";
}
function setTimer() {
   
   var timeBox = document.querySelector("#targetDate");
   
   if (timeBox.value.toString() === "")
      return;
   
   const timerDate = new Date(timeBox.value.toString());
   var mili = timerDate.getTime() - (new Date()).getTime() ;
   
   if (mili < 0)
      return;
   
   setTimeout(timeUp, mili);
}


function updateClock(clock) {

   clock.innerHTML = new Date().toLocaleTimeString();

}

function showTime() {

   var timeMsgBox = document.querySelector("#time-msg");
   setInterval(function() {
      updateClock(timeMsgBox);
   }, 1000);

}
async function addAlarm() {
   const alarm = {
      date : document.querySelector("#targetDate").value
   }
   const response = await fetch("http://localhost:6969/alarms/" + userID +'/' , 
      {
         method: "POST",
         headers : {
            "Content-Type" : "application/json"
         },
         body : JSON.stringify(alarm)
      }
      
    );
    console.log(await response.text());
}

async function addUser() {
   const data = {
      name :"tauri",
      pass: 'node'
   }
   const response = await fetch('http://localhost:6969/users' , {
      method : 'POST',
      headers : {
         "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
   });
   userID = await response.text();
   console.log(userID);
}


document.querySelector("#time-button").addEventListener("click",  event => {event.preventDefault();showTime();});
document.querySelector("#set-timer").addEventListener("click",  event => {event.preventDefault();setTimer();});
document.getElementById("send-data").addEventListener("click" , event => {event.preventDefault();addUser();});
document.getElementById("send-alarm").addEventListener("click" , event => {event.preventDefault();addAlarm();});