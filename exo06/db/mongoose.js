const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/expressmongo', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("connected to", db.client.s.url);
});
// os données sont composées d'un id et d'un nom. Mongoose nécessite de créer un schéma pour chaque collection. 
const personsSchema = Schema({
    name: String
});

const Persons = mongoose.model('Persons', personsSchema);

module.exports = {};
module.exports.persons = Persons;