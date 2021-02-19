var mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
    },
    age: {
        type: Number
    },
    areYouStraight: {
        type: Boolean,
        default: true
    }
})

var User = mongoose.model('User', userSchema)

module.exports = User;