const mongooseDev = require('mongoose');

const userSchema = mongooseDev.Schema({

    phoneNumber: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
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