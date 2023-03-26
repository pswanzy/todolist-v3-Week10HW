//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

// create a date object that requires the date.js file
const date = require(__dirname + "/date.js");

const app = express();

// set an array for the default items in the list
let items = ["Wake Up", "Consume Sustenance", "Cleanse Corpus"];
// set an empty array for new work items
let workItems = ["Stare at Clock", "Stare at Glowing Rectangle", "Toil Endlessly"];

// setup an array for Fun and another for Weekend
let funItems = ["Traverse the known universe", "Climb every mountain", "Sail every sea"];

// setup an array for Fun and another for Weekend
let weekendItems = ["Sleep", "Eat", "Repeat"];

// set EJS as the viewing engine to display html
app.set('view engine', 'ejs');
// use body parser to parse html file
app.use(bodyParser.urlencoded({ extended: true }));
// use Express to serve or display static files such as images, CSS, JS files etc.
app.use(express.static("public"));

// default html file in web server
app.get("/", function(req, res) {
  //get the system date from the getDate function exported by the date.js file
  let day = date.getDate();
  // use EJS render to display the day and the To Do List
  res.render("list", { listTitle: day, newListItems: items });
});

// display default to do list on the default root folder
app.post("/", function(req, res) {
  // code allows items to be added to the regular list and work list
  let item = req.body.newItem;

  if (req.body.list === "Work") {   // if route is /work, add to work list
    workItems.push(item);
    res.redirect("/work");
  } else if (req.body.list === "Fun") {   // if list === Fun then go to /fun
    funItems.push(item);
    res.redirect("/fun");
  } else if (req.body.list === "Weekend") {   // if list ==== Weekend then go to /weekend
    weekendItems.push(item);
    res.redirect("/weekend");
  }
  else {
    items.push(item);
    res.redirect("/");
  }
});

// display default to do list on the localhost:3000/work route!
app.get("/work", function(req, res) {
  let day = date.getDate();
  res.render("list", { listTitle: "Work Items To-Do List for: " + day, newListItems: workItems })
});

// add a app.get for every route - /fun and /weekend
app.get("/fun", function(req, res) {
  let day = date.getDate();
  res.render("list", { listTitle: "Fun Activities", newListItems: funItems })
});
// Make sure your listTitle starts off with Fun Items and Weekend Items
app.get("/weekend", function(req, res) {
  let day = date.getDate();
  res.render("list", { listTitle: "Weekend Must Do", newListItems: weekendItems })
});

app.listen(3000, function() {
  console.log("Server is running on port 3000")
});