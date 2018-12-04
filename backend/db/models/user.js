const { mongoose, autoIncrement } = require('../mongo')

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
        required : true
    },
    name: {
        type : String,
        required : true

    },
    loginId: {
        type : String,
        required : true
    },
    loginPassword: {
        type : String,
        required : true
    }
})

// doctorId를 Auto Increment 필드로 지정
userSchema.plugin(autoIncrement, {
    model: 'User',
    field: 'userId',
    startAt: 1
})

module.exports = mongoose.model('User', userSchema)
