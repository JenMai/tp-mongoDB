const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

let persons = require("./data");
let counter = persons.length + 1;


const db= require('./db/mongoose');
const Persons = db.persons;

router
    .use(bodyParser.json()) // for parsing application/json
    .use(bodyParser.urlencoded({extended: true}))// for parsing application/x-www-form-urlencoded

    .get("/", (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })
    .get('/persons',
        (req, res) => {
            Persons.find({})
                .exec((err, data) => {
                    if (err) console.log("error in get persons", err);
                    else res.json(data);
                })
    })
    .post('/persons',
    (req, res) => {
        const p = new Persons(req.body);
        p.save()
            .then(res.redirect(303, '/persons'))
            .catch(err => res.status(400).send("unable to save to database", err));
    })
    .delete('/persons/:index',
    (req, res) => {
      Persons.findByIdAndDelete(req.params.index)
            .then(res.redirect(303, '/persons'))
            .catch(err => res.status(400).send("unable to delete from database", err));
   })
   .patch('/persons/:index',
   (req, res) => {
       Persons.findOneAndUpdate({_id: req.params.index}, req.body)
           .then(res.redirect(303, '/persons'))
           .catch(err => res.status(400).send("unable to delete from database", err));
   })
   .use((req, res) => {
    res.status(400);
    res.json({error: "Bad request"});
    })
    ;

module.exports = router;