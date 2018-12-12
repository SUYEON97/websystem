const { mongoose, autoIncrement } = require('../mongo')

const workCommentSchema = new mongoose.Schema({
    commentId: {
        type: Number,
        unique: true,
        required : true
    },
    userId: {
        type : String,
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


workCommentSchema.plugin(autoIncrement, {
    model: 'workComment',
    field: 'commentId',
    startAt: 1
})

module.exports = mongoose.model('workComment', workCommentSchema)
