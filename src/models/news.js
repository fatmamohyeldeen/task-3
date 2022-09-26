const mongoose = require('mongoose')

const event = mongoose.model('event', {
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 6
    },


    userName: {
        type: String
    },
    date: {
        type: String,
        time: new Date().getTime()

    }
})

module.exports = Task