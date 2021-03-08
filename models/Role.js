import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const model = mongoose.model;

const Role = new Schema({
    value: {
        type: String,
        unique: true,
        default: 'user'
    },
})

export default model('Role', Role)
