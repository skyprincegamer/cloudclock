const express = require('express')
const fs = require('node:fs/promises')
const app = express()
let users;
 async function fetchUsers() {
  try {
    users = JSON.parse(await fs.readFile('users.json', { encoding: 'utf8' }));
    console.log(users)
  } catch (err) {
    users=[];
    await fs.writeFile('users.json' , "[]" )
  }
}
fetchUsers();
function findUser(id){
  for(const element of users){
    if (element.id === id){
      return element
    }
  }
  return undefined;
}
async function addUser(user) {
  users.push(user);
  await fs.writeFile('users.json' , JSON.stringify(users));
}
// respond with "hello world" when a GET request is made to the homepage
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(express.json())
app.get('/users/:id', (req, res) => {
  res.send(users[req.params.id - 1 ].name);
})
app.get('/alarms/:user/:alarm' , (req , res ) => {
if(findUser(req.params.user) !== undefined){
  if(findAlarm(req.params.alarm , req.params.user) !== undefined){
    return res.send('Alarm is set');
  }
}

});
app.post('/alarms/:user/' , (req, res) => {
let user = findUser(req.params.user);
let id ;
if(user !== undefined){
  if(user.alarms === undefined){
    user.alarms =[];
  }
  id = users.alarms.length
  user.alarms.push({ "id" : id, "date" : req.body.date });
  console.log(user.alarms);
  return res.send(JSON.stringify(user.alarms[user.alarms.length-1]));
}
}
);
app.post('/users' ,(req , res) => {
  let newUser = req.body;
  newUser.id = users.length;
  addUser(newUser);

  
  
  return res.send(newUser.id.toString());
  
})
app.listen(6969, () => {
  console.log(`Example app listening on port ${6969}`)
})
