const mongooseDev = require('mongoose');

const userSchema = mongooseDev.Schema({

    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    fcmToken: {
        type: String
    },

    city: {
        type: String
    },

    state: {
        type: String
    }

});

const dbName = 'users-collection-db';

mongooseDev.model(dbName, userSchema);

module.exports = mongooseDev.model(dbName);