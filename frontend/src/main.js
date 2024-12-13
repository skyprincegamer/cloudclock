const { invoke } = window.__TAURI__.core;


// async function fetchData() {
//    const response = await fetch("http://localhost:6969/");
//    document.getElementById("server-data").innerHTML = await response.text();

// }
function sendData() {

   var _ = new FormData(document.getElementById("form"));
   const data = Object.fromEntries(_);
   console.log(data);

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



document.querySelector("#time-button").addEventListener("click",  event => {event.preventDefault();showTime();});
document.querySelector("#set-timer").addEventListener("click",  event => {event.preventDefault();setTimer();});
document.getElementById("send-data").addEventListener("click" , event => {event.preventDefault();sendData();});