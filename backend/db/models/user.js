const { mongoose, autoIncrement } = require('../mongo')

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true
    },
    userName: String,
    loginId: {
      type: String,
      unique: true
    },
    loginPw: String
})

// doctorId를 Auto Increment 필드로 지정
userSchema.plugin(autoIncrement, {
    model: 'User',
    field: 'userId',
    startAt: 1
})

module.exports = mongoose.model('User', userSchema)
