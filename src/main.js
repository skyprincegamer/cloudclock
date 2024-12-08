const { invoke } = window.__TAURI__.core;

let timeMsgBox;


async function showTime() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/


  function updateClock ( clock ) {
    clock.innerHTML = new Date().toLocaleTimeString();
  }

  setInterval(function () {
      updateClock( timeMsgBox);
  }, 1000);

}

window.addEventListener("DOMContentLoaded", () => {
  timeMsgBox= document.querySelector("#time-msg");
  document.querySelector("#time-button").addEventListener("click", (e) => {
    showTime();
    document.querySelector("#time-button").removeEventListener("show-time");
  });
});
