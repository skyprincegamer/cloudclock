const express = require('express')
const fs = require('node:fs/promises')
const app = express()
let users;
// headers
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json())


async function fetchUsers() 
{
  try 
  {
    users = JSON.parse(await fs.readFile('users.json', { encoding: 'utf8' }));
    console.log(users)
  } catch (err) {
    users=[];
    await fs.writeFile('users.json' , "[]" )
  }
}
fetchUsers();


function findUser(id){
  id = Number(id);
  for(const element of users){
    if (element.id === id){
      return element
    }
  }
  return undefined;
}


function findAlarm(alarmID , userID){
  let user = findUser(userID);
  if(user!== undefined){
    for(const alarm of user.alarms)
    {
      if(alarm.id == alarmID)
        return alarm;
    
    }
    return undefined;
}
  else 
    return undefined;
}


async function addUser(user) {
  users.push(user);
  await fs.writeFile('users.json' , JSON.stringify(users));
}


app.get('/users/:id', (req, res) => {
  res.send(users[req.params.id - 1 ].name);
})

app.get('/alarms/:user/:alarm' , (req , res ) => {

  if(findAlarm(req.params.alarm , req.params.user) !== undefined){
    return res.send('Alarm is set');
  }

});




app.post('/alarms/:user/' , (req, res) => {

  let user = findUser(req.params.user);
  console.log(users + ', params = ' + req.params.user )
  console.log(user)
  if(user !== undefined){

    if(user.alarms === undefined){
      user.alarms =[];
    }

    const id = user.alarms.length
    user.alarms.push({ "id" : id, "date" : req.body.date });
    console.log(user.alarms);
    return res.send(JSON.stringify(user.alarms[user.alarms.length-1]));
  }

return res.send("ERROR")  
});


app.delete("/alarms/:user/:alarm" , (req, res) =>{

    if(findAlarm(req.params.alarm , req.params.user) !== undefined){
      let user = findUser(req.params.user);
      let alarm = findAlarm(req.params.alarm , req.params.user);
      user.alarms = user.alarms.filter(function (a) {
        return a != alarm;
      });
      return res.send("Successfully deleted alarm" + JSON.stringify(alarm));
    }
});


app.post('/users' ,(req , res) => {
  let newUser = req.body;
  newUser.id = users.length;
  addUser(newUser);
  return res.send(newUser.id.toString());
})


app.listen(6969, () => {
  console.log(`Example app listening on port ${6969}`)
})
