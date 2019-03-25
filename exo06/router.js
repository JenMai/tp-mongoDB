const express = require("express");
const router = express.Router();

let persons = require("./data");
let counter = persons.length + 1;

router
    .get("/", (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })
    .get("/persons", (req, res, next) => {
        if (Object.keys(req.query).length === 0) {
            res.json(persons);
            return;
        }
        if (req.query.name === undefined) {
            next();
            return;
        }
        res.json(persons.filter(p => p.name === req.query.name));
    })
    .get("/persons/:id", (req, res) => {
        res.json(persons.find(p => p.id === req.params.id));
    })

    .post("/", (req, res) => {
        req.body.id = counter++;
        persons.push(req.body);
        res.json(persons);
    })

    .put("/persons/:id", (req, res) => {
        let idx = persons.findIndex(p => p.id === +req.params.id);
        if (idx > -1) {
            persons[idx].name = req.body.name;
        }
        res.end();
    })

    .delete("/persons/:id", (req, res) => {
        let id = +req.params.id;
        persons = persons.filter(p => p.id !== id);
        res.end();
    })

    .use((req, res) => {
        res.status(400);
        res.json({error: "Bad request"});
    });


module.exports = router;