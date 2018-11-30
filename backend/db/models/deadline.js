const { mongoose, autoIncrement } = require('../mongo')

const deadlineSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true
        // unique: true
    },
    major_name: {
        type: String,
        required: true
    },
    subject_name:{
        type: String,
        required: true
    },
    hw_name: {
        type: String,
        required: true
    },
    hw_date: {
        type: Number,
        required: true
    }
})

// doctorId를 Auto Increment 필드로 지정
// deadlineSchema.plugin(autoIncrement, {
//     model: 'Deadline',
//     field: 'userId',
//     startAt: 1
// })

module.exports = mongoose.model('Deadline', deadlineSchema)
