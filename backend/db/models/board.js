const { mongoose, autoIncrement } = require('../mongo')

const boardSchema = new mongoose.Schema({
    boardId: {
        type: Number,
        unique: true,
        required : true
    },
    userId: {
        type : String,
        required : true
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

boardSchema.plugin(autoIncrement, {
    model: 'Board',
    field: 'boardId',
    startAt: 1
})

module.exports = mongoose.model('Board', boardSchema)