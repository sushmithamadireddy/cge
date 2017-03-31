
//P3-12; Benjamin Wolff, Nagnath Gokuldas Prabhu

//devteam ID (P3-7) Amarendar Reddy Reddygari (s528760), Connor Besancenez (s519984) are going to work on Roofing basecoats.



var express = require('express');
var api = express.Router();
var find = require('lodash.find');
var remove = require('lodash.remove');
var findIndex = require('lodash.findindex');
var Model = require('../models/roofingBasecoat.js');
const notfoundstring = 'No such roofing basecoats';

// See app.js to find default view folder (e.g.,"views")
// see app.js to find  default URI for this controller (e.g., "waterproofingPrimer")
// Specify the handler for each required combination of URI and HTTP verb 
// HTML5 forms can only have GET and POST methods (use POST for DELETE)

// HANDLE JSON REQUESTS --------------------------------------------


//GET create 
api.get('/create', function(req, res) {
    console.log('Handling GET /create' + req);
    res.render("roofing_basecoats/create.ejs",
        { title: "RB", layout: "layout.ejs" });
});
//GET Index 
api.get("/", function (request, response) {
  response.render("roofing_basecoats/index.ejs");
});
//GET findall 
api.get('/findall', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var data = req.app.locals.roofingBasecoats.query;
    res.send(JSON.stringify(data));
});
//GET findone 
   api.get('/findone/:id', function(req, res){
     res.setHeader('Content-Type', 'application/json');
    var id = parseInt(req.params.id);
    var data = req.app.locals.roofingBasecoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    res.send(JSON.stringify(item));
}); 

//GET /delete/:id 
api.get('/delete/:id', function(req, res) {
    console.log("Handling GET /delete/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.roofingBasecoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('roofing_basecoats/delete.ejs',
        {
            title: "RB",
            layout: "layout.ejs",
            roofingBasecoat: item
        });
});

// GET /details/:id
api.get('/details/:id', function(req, res) {
    console.log("Handling GET /details/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.roofingBasecoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('roofing_basecoats/details.ejs',
        {
            title: "RB",
            layout: "layout.ejs",
            roofingBasecoat: item
        });
});

// GET /edit:/id
api.get('/edit/:id', function(req, res) {
    console.log("Handling GET /edit/:id " + req);
    var id = parseInt(req.params.id);
    var data = req.app.locals.roofingBasecoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("RETURNING VIEW FOR" + JSON.stringify(item));
    return res.render('roofing_basecoats/edit.ejs',
        {
            title: "RB",
            layout: "layout.ejs",
            roofingBasecoat: item
        });
});

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', function(req, res) {
    console.log("Handling POST " + req);
    var data = req.app.locals.roofingBasecoats.query;
    var item = new Model;
    console.log("NEW ID " + req.body._id);
    item._id = parseInt(req.body._id);
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = parseInt(req.body.displayorder);
    data.push(item);
    console.log("SAVING NEW ITEM " + JSON.stringify(item));
    return res.redirect('/roofingBasecoat');
});

// POST update
api.post('/save/:id', function(req, res) {
    console.log("Handling SAVE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling SAVING ID=" + id);
    var data = req.app.locals.roofingBasecoats.query;
    var item = find(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("ORIGINAL VALUES " + JSON.stringify(item));
    console.log("UPDATED VALUES: " + JSON.stringify(req.body));
    item.name = req.body.name;
    item.unit = req.body.unit;
    item.price = req.body.price;
    item.displayorder = req.body.displayorder;
    console.log("SAVING UPDATED ITEM " + JSON.stringify(item));
    return res.redirect('/roofingBasecoat');
});

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', function(req, res, next) {
    console.log("Handling DELETE request" + req);
    var id = parseInt(req.params.id);
    console.log("Handling REMOVING ID=" + id);
    var data = req.app.locals.roofingBasecoats.query;
    var item = remove(data, { '_id': id });
    if (!item) { return res.end(notfoundstring); }
    console.log("Deleted item " + JSON.stringify(item));
    return res.redirect('/roofingBasecoat');
});

module.exports = api;

/* 10 controller methods handled by controller:

controllers/roofingBasecoats.js

2 Respond with JSON:

http://127.0.0.1:8082/roofingBasecoat/findall [WORKING]
http://127.0.0.1:8082/roofingBasecoat/findone/1 [WORKING]

5 Respond with CRUD Views:

http://127.0.0.1:8082/roofingBasecoat [WORKING]
http://127.0.0.1:8082/roofingBasecoat/create [WORKING]
http://127.0.0.1:8082/roofingBasecoat/delete/1 [WORKING]
http://127.0.0.1:8082/roofingBasecoat/details/1 [WORKING]
http://127.0.0.1:8082/roofingBasecoat/edit/1 [WORKING]

3 Respond by executing CRUD actions:

http://127.0.0.1:8082/roofingBasecoat/save [WORKING]
http://127.0.0.1:8082/roofingBasecoat/save/1 [WORKING]
http://127.0.0.1:8082/roofingBasecoat/delete/1 [WORKING]

*/