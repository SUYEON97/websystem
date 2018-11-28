const { mongoose, autoIncrement } = require('../mongo')

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
})

// doctorId를 Auto Increment 필드로 지정
doctorSchema.plugin(autoIncrement, {
    model: 'User',
    field: 'userId',
    startAt: 1
})

module.exports = mongoose.model('User', userSchema)
