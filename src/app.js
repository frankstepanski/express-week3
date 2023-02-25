const express = require('express');
const app = express();
const morgan = require('morgan');
const users = require('./data/users');

const cars = { 
    honda: { model: "Accord", price: 30000 }, 
    lexus: { model: "LX", age: 90000 } 
};

/*
const logRequest = (req, res, next) => {
    console.log("A request is being made!");
    next();
};
*/

//app.use(logRequest);


// Using morgan
app.use(morgan('dev'));

// Static files
app.use(express.static('public'));

//  default route:
app.get("/", (req, res, next) => {
    res.send("<h1>Default root route</h1>");
});

// about route:
app.get("/about", (req, res, next) => {
    res.status(200).send("<h1>About Code the Dream!</h1>");
});

// cars route with param:
/*
app.get('/cars/:name', (req, res, next) => {
    console.log(req.params.name); // lexus
    console.log(cars[req.params.name]); // { model: 'LX', age: 90000 }
    res.send(cars[req.params.name]);
});
*/

// search route with query:
app.get('/search', (req, res, next) => {
    console.log(req.query.q); // javascript
    res.send(`You searched for: ${req.query.q}`);
});

// cars route with params and query:
// GET /cars/lexus?color=red
app.get('/cars/:name', (req, res, next) => {
    console.log(req.params.name); // lexus
    console.log(req.query.color); // red
    console.log(cars[req.params.name]); // { model: 'LX', age: 90000 }
    res.send(cars[req.params.name]);
});

// users route:
app.get('/users', (req, res, next) => {
    res.send(users);
});

// greeting route:
app.get('/greeting', (req, res, next) => {
    const greeting = 'Hello World!';
    res.json(greeting);
});

// users route with param:
app.get('/users/:id', (req, res, next) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    res.send(user);
});

// 404 route (middleware)):
// This route will be called if no other route is matched
app.use((req, res, next) => {
    res.status(404).send("<h1>404: Page not found</h1>");
});


module.exports = app;