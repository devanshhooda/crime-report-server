const mongooseDev = require('mongoose');

const userSchema = mongooseDev.Schema({

    email: {
        type: String,
        unique: true,
        required: true,
    },

    phoneNumber: {
        type: String,
    },

    fullName: {
        type: String
    },

    fcmToken: {
        type: String
    },

});

const dbName = 'users-collection-db';

mongooseDev.model(dbName, userSchema);

module.exports = mongooseDev.model(dbName);