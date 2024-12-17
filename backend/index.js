const express = require('express')
const fs = require('node:fs/promises')
const app = express()
let users;
 async function fetchUsers() {
  try {
    users = JSON.parse(await fs.readFile('users.json', { encoding: 'utf8' }));
    console.log(users)
  } catch (err) {
    console.log(err);
  }
}
fetchUsers();
async function addUser(user) {
  users.push(user);
  await fs.writeFile('users.json' , JSON.stringify(users)) ;
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

app.post('/users' ,(req , res) => {
  console.log(req.body);
  let newUser = req.body;
  if(users === undefined){
    users = [];
    newUser.id = 0;
  }
  else{
    newUser.id = users.splice(-1)[0].id +1;
  }
  addUser(newUser);
  
  
  return res.send('New user id is ' + newUser.id);
  
})
app.listen(6969, () => {
  console.log(`Example app listening on port ${6969}`)
})
