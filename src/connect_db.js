const mongoose = require('mongoose');
const MONGO_PW = process.env.MONGO_PW;
const DB = 'sample_airbnb'
const cnx_str = `mongodb+srv://server:${MONGO_PW}@trivit-uabxb.mongodb.net/{DB}?retryWrites=true&w=majority`;


export function connect() {
    mongoose.connect(cnx_str, {useNewUrlParser: true});

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connected to db!');
    });
}
