const mongoose = require('mongoose');
const MONGO_PW = process.env.MONGO_PW;
const DB = 'test';
const cnx_str = `mongodb+srv://server:${MONGO_PW}@trivit-uabxb.mongodb.net/{DB}?retryWrites=true&w=majority`;

module.exports = {
    connect,
}

// return a close function
function connect() {
    mongoose.connect(cnx_str, {useNewUrlParser: true});

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log('connected to db!');
    });

    return () => db.close();
}
