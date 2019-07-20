const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema(
    {
        name: String,
        lastname: String,
        login: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            require: true
        },
        status: {
            type: String,
            require: true
        },
        courses: []
    },

    {
        timestamps: true
    }
);

user.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('users', user);