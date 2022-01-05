//Consts
const express = require('express');
const api = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 8030;
const loginSchema = require('./Schema/loginSchema');

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//Mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:password@userdb.jvqo8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true}, { useUnifiedTopology: true });
const db= mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected')
});

//Function
function UserID(length){
  let result = '';
  const charaters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    result += charaters.charAt(Math.floor(Math.random() * charaters.length))
  }
  return result;
}

api.use(cors())

//Create User
api.post('/newUser', urlencodedParser, (req, res) => {
  const { newUser } = req.body;
  const { newPass } = req.body;
  if(newUser == undefined) return res.json ({ status: 400, message: "Bad Request"});

  const schema = new loginSchema({
    _id: UserID(Math.floor(Math.random() * 75)),
    username: newUser,
    password: newPass
  }).save().then(() => {
    res.json({
      status: 200, message: "Success"
    });
  }).catch((err) => {
    res.json({
      status: 500, message: "Internal Server Error"
    });
    console.log(err)
  });
});

//Get User
api.get('/users', urlencodedParser, async (req, res) => {
  const result = await loginSchema.find();
  res.json({
    data: result
  });
});

//Get users for Edit
api.get('/edit/users', urlencodedParser, async (req, res) => {
  const result = await loginSchema.find();
  res.json({
    data: result
  });
});

//Get User by ID
api.get('/users/:id', urlencodedParser, async (req, res) => {
  const id = req.params['id'];
  if(id == undefined) return res.json({ status: 400, message: "Bad Request" });

  const result = await loginSchema.findById();
  if(!result){
    res.json({
      status: 404, message: "User not found!"
    });
  }

  res.json({
    status: 200, message: "Success", data: result
  });
});

api.get('/users', urlencodedParser, async (req, res) => {
  const name = req.params['name']
  const password = req.params['password']
  if(name == undefined || password == undefined) return res.json({ status: 400, message: "Bad Request, Undefined params"});

  const result = await loginShema.findOne({
    username: name,
    password: password
  });
  if(result){
    res.json({
      status: 200,
      message: "Success",
      finded: resoult
    });
  }else{
    console.log("Error while finding user ", result);

    res.json({
      status: 500,
      message: "Error while finding user"
    });
  }
});

//Edit User Name by ID
/*api.post('/edit/users/name/:id', urlencodedParser, async (req, res) => {
  const { editUser } = req.body;
  const id = req.params['id'];
  if(id == undefined) return res.json({ status: 400, message: "Bad Request, ID does not Exist"});

  const result = await loginSchema.updateOne({
    _id: id
  }, {
    username: editUser
  });
  if(result){
    res.json({
      status: 200,
      message: "Success",
      edited: result
    });
  }else{
    console.log("Error while editing user", result);

    res.json({
        status: 500,
        message: "Failed to edit user"
    });   
  }
});

//Edit User Password by ID
api.post('/edit/users/password/:id', urlencodedParser, async (req, res) => {
  const { editUser } = req.body;
  const id = req.params['id'];
  if(id == undefined) return res.json({ status: 400, message: "Bad Request, ID does not Exist"});

  const result = await loginSchema.updateOne({
    _id: id
  }, {
    username: editUser
  });
  if(result){
    res.json({
      status: 200,
      message: "Success",
      edited: result
    });
  }else{
    console.log("Error while editing user", result);

    res.json({
        status: 500,
        message: "Failed to edit user"
    });   
  }
});
*/

//Delete User by ID
api.post('/users/:id', urlencodedParser, async (req, res) => {
    const id = req.params['id'];
    if(id == undefined) return res.json({ status: 400, message: "Bad Request, ID does not Exist" });

    const result = await loginSchema.findOneAndDelete({
      _id: id
    });
    if(result){
        res.json({
            status: 200,
            message: "Success",
            deleted: result
        });
    }else{
        console.log("Error while deleting user", result);

        res.json({
            status: 500,
            message: "Failed to delete user"
        });
    }
});

//Delete All Users
api.post('/usersDelete/all', urlencodedParser, async(req,res) => {
  const result = await loginSchema.deleteMany();
  if(result){
    res.json({
      status: 200,
      message: "Success",
      deleted: result
    });
  }else{
    console.log("Error while deleting all users", result);

    res.json({
      status: 500,
      message: "Failed to delete all users"
    });
  }
});

//Listening to port at localhost
api.listen(port, () => {
  console.log('localhost/' + port)
})
