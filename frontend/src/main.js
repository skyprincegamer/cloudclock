const { invoke } = window.__TAURI__.core;

let userID;

async function addAlarm(targetDate) {
   const alarm = {
      date : targetDate
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

async function register() {
   const data = {
      name :document.querySelector('[name="usercode"]'),
      serverpass : document.querySelector('[name="server-password"]')
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

document.getElementById("login").addEventListener("click" , event => {event.preventDefault();register();});
