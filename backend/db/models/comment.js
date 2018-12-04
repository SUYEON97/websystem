const { mongoose, autoIncrement } = require('../mongo')

const commentSchema = new mongoose.Schema({
    commentId: {
        type: Number,
        unique: true,
        required : true
    },
    userId: {
        type : Number,
        required : false,

    },
    time: {
        type : Date,
        required : false,
        default : Date.now
    },
    boardId: {
        type : Number,
        required : true
    },
    content: {
        type : String,
        required : true
    }
})


commentSchema.plugin(autoIncrement, {
    model: 'Comment',
    field: 'commentId',
    startAt: 1
})

module.exports = mongoose.model('Comment', commentSchema)
