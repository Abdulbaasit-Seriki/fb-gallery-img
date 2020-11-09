const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fbUserName: {
        type: String,
        required: [true, `What is the user's name`]
    },
    fbId: {
        type: String,
        required: [true, `Please Include The User's Facebook Id`]
    },
    imgs: {
        type: [String]
    }
})


module.exports = mongoose.model('User', UserSchema)