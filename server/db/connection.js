const mongoose = require('mongoose')

const activeConn = async () => {
    try {
        console.log('connecting...')
        return await mongoose.connect('mongodb://localhost:27019/bonsai-shop', { useNewUrlParser: true }, err => {
            if (!err) console.log('connected to mongodb sucsessfully 👍');
                console.log(err);
            }
        );
    } catch (error) {
        console.log('Error connecting to the DB:', error);
    }
}

module.exports = activeConn
