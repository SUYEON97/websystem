const { mongoose, autoIncrement } = require('../mongo')

const deadlineSchema = new mongoose.Schema({
    UserId: Number,
    MajorId: String,
    Hw_name: String,
    Hw_date:String
    //create_date: { type:Date, default:Date.now }
})

module.exports = mongoose.model('Deadline', deadlineSchema)
