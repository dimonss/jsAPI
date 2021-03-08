import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const model = mongoose.model;

const User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type:String,
        ref: "Role"
    }]
})

export default model('User', User)

// module.exports = model('User', User)
