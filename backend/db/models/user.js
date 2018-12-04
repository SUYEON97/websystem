const { mongoose, autoIncrement } = require('../mongo')

const userSchema = new mongoose.Schema({
    userId: Number,
    userName: String,
    loginId: {
        type: String,
        unique: true
<<<<<<< HEAD
    },
    userName: String,
    loginId: {
      type: String,
      unique: true
    },
    loginPw: String
=======
      },
    loginPw: String,
    //create_date: { type:Date, default:Date.now }
>>>>>>> 8ec70af51aecb82082550664037b9a9b9a36f51a
})

// doctorId를 Auto Increment 필드로 지정
userSchema.plugin(autoIncrement, {
    model: 'User',
    field: 'userId',
    startAt: 1
})

module.exports = mongoose.model('User', userSchema)
