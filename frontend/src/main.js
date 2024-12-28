
let userID;

async function addAlarm(targetDate) {
   const alarm = {
      date: targetDate.toString()
   }
   const response = await fetch("http://localhost:6969/alarms/" + userID + '/',
      {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(alarm)
      }

   );
   let t = await response.text();
   console.log(t);
   document.getElementById('alarms').insertAdjacentHTML('afterbegin', `<div> ${t}</div>`);
}

async function register() {

   const data = {
      name: document.querySelector('[name="usercode"]').value,
      serverpass: document.querySelector('[name="server-password"]').value
   }
   const response = await fetch('http://localhost:6969/users', {
      method: 'POST',
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   });
   userID = await response.text();
}
if (window.location.href === "/") {
   document.getElementById("login").addEventListener("click",
       async event => {
          event.preventDefault();
          await register();
          window.location.replace("/clock");
       });
}
if (window.location.href === "/clock") {
   document.getElementById('add-alarm').addEventListener('click', async () => {
      await addAlarm(document.querySelector('[type="datetime-local"]').value);
   })
}
