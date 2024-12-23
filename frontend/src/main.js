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
      name :document.querySelector('[name="usercode"]').value,
      serverpass : document.querySelector('[name="server-password"]').value
   }
   const response = await fetch('http://localhost:6969/users' , {
      method : 'POST',
      headers : {
         "Content-Type" : "application/json"
      },
      body : JSON.stringify(data)
   });
   userID = await response.text();
   return userID;
}

document.getElementById("login").addEventListener("click" , async event => {
   event.preventDefault();
   await register();
   window.location.replace("/clock");
});
