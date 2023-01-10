var bodyParser = require("body-parser")
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const { MongoClient } = require('mongodb');
const { Console } = require("console");
const app = express();
const uri = "mongodb+srv://techweb:soccerbooking@techweb.4rggi0y.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(uri, { useUnifiedTopology: true });
let siteDB, utenticollection
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({  //   body-parser to
  extended: true               //   parse data
})); 
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))

mongoose.connect(uri, { useNewUrlParser: true }, { useUnifiedTopology: true });
const bookedSchema =
{
  campo: String,
  prezzo: String,
  ora:String,
  giorno:String
  
}
const noteSchema =
{
  user: String,
  email: String,
  password: String,
  passwordcon: String
}
const searchSchema={
  regione: String,
  citta: String,
  campo: String,
  prezzo: String

}

const note = mongoose.model("Note", noteSchema);
const searchdb = mongoose.model("Campi", searchSchema);
const booked = mongoose.model("booked", bookedSchema);

console.log("connect to db ")

app.use(express.static(__dirname + '/public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "index.html");
})

app.post("/", async function (req, res) {

  const usert = await note.findOne({ user: req.body.user });
  const emailt = await note.findOne({ email: req.body.email });
  

  if (usert == null && emailt == null) {


    if (req.body.password == req.body.passwordcon) {

      let newNote = new note({
        user: req.body.user,
        email: req.body.email,
        password: req.body.password,
        passwordcon: req.body.passwordcon
      })
      newNote.save();
      res.redirect("index.html");
    }
    else {
       
      res.redirect("invalidpassword.html");
    }
  }
  else {
    if (emailt == null) {
      res.redirect("invaliduser.html");
    }
    else {
      res.redirect("invalidemail.html");
    }
  }
});

app.post("/accedi", async function (req, res) {
  var emailuser = req.body.email;
  let password = req.body.password;
  const emailin = await note.findOne({ email: req.body.email, password: req.body.password });
  const username = emailin.user;
  console.log(username);
  console.log(emailuser );
  console.log(password);
  console.log(emailin);
  if (emailin == null) {
    res.redirect("index.html");
    console.log(emailin);
  }
  else {
    var doc = username;
    res.send(doc);
  }
})
app.post("/search", async function (req, res) {
  var regione = req.body.regione;
  
  const regionein = await searchdb.find({ regione: req.body.regione });
  const region = regionein;
  console.log(regione);
  console.log(region);
  
  if (regionein == null) {
    res.redirect("index.html");
    
  }
  else {

  




    var doc = region;
    res.send(doc);
  }
})
app.post("/verifica", async function (req, res) {
  var campo = req.body.campo;
  var ora = req.body.ora;
  var giorno = req.body.giorno;
  var prezzo = req.body.prezzo;
  console.log(campo);
  console.log(ora);
  console.log(giorno);
  console.log(prezzo);
  const bookedin = await booked.findOne({ campo: campo, ora:ora, giorno:giorno });
  const bookeds = bookedin;
  console.log(bookeds);
  var status = false  ;

  
  if (bookedin == null) {
    console.log("nel if");
    status = true;
    var doc =status;
    res.send(doc);
  }
  else if (bookedin != null) {
    console.log("nel else");
    status = false 
    var doc =status;
    res.send(doc);
  }
})
app.post("/prenota", async function (req, res) {
  var campo = req.body.campo;
  var ora = req.body.ora;
  var giorno = req.body.giorno;
  var prezzo = req.body.prezzo;
  console.log(campo);
  console.log(ora);
  console.log(giorno);
  console.log(prezzo);
  const bookedin = await booked.findOne({ campo: campo, ora:ora, giorno:giorno });


  console.log(bookedin);
  var status = false  ;

 if (bookedin==null){
  let newbooked = new booked({
    campo: req.body.campo,
    ora: req.body.ora,
    giorno: req.body.giorno,
    prezzo: req.body.prezzo
  })
  newbooked.save();}
  
    status==true;
    var doc =status;
    res.send(doc);
 
})


app.listen(3000);
console.log("run on port 3000")





