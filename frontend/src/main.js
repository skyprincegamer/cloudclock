const { invoke } = window.__TAURI__.core;


function setTimer() {
   var timeMsgBox = document.querySelector("#target-date");

   timeMsgBox.innerHTML = document.querySelector("#targetDate").value.toString();
}
function updateClock(clock) {
   clock.innerHTML = new Date().toLocaleTimeString();
}

function showTime() {
   setInterval(function() {
      updateClock(timeMsgBox);
   }, 1000);

}

window.addEventListener("DOMContentLoaded", () => {
   document.querySelector("#time-button").addEventListener("click", () => {
      showTime();
      document.querySelector("#time-button").removeEventListener("show-time");
   });
});
document.querySelector("#set-timer").addEventListener("click", () => {
   setTimer();

});
