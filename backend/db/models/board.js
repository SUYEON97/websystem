const { mongoose, autoIncrement } = require('../mongo')

const boardSchema = new mongoose.Schema({
    boardId: {
        type: Number,
        unique: true,
        required : true
    },
    userId: {
        type : Number,
        required : false

    },
    time: {
        type : Date,
        required : true,
        default : Date.now
    },
    commentId: {
        type : Number,
        required : false
    },
    content: {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    }
})

// doctorId를 Auto Increment 필드로 지정
boardSchema.plugin(autoIncrement, {
    model: 'Board',
    field: 'boardId',
    startAt: 1
})

module.exports = mongoose.model('Board', boardSchema)
