const mongoose = require('mongoose');

const cnx_str = 'mongodb+srv://server:Pjh9cpaFR4evUnD@trivit-uabxb.mongodb.net/test?retryWrites=true&w=majority'

export function connect() {
    mongoose.connect(cnx_str, {useNewUrlParser: true});

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connected to db!');
    });
}

