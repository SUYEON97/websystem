const { mongoose, autoIncrement } = require('../mongo')

const deadlineSchema = new mongoose.Schema({
    hwId: {
        type: Number,
        unique: true
    },
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
        type: Date,
        required: true
    }
})

deadlineSchema.plugin(autoIncrement, {
    model: 'Deadline',
    field: 'hwId',
    startAt: 1
})

module.exports = mongoose.model('Deadline', deadlineSchema)
