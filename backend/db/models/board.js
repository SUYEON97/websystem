const { mongoose, autoIncrement } = require('../mongo')

var now = new Date();
now.setHours(26);

const boardSchema = new mongoose.Schema({
    boardId: {
        type: Number,
        unique: true,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true,
        default: now
    },
    commentId: {
        type: Number,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    commentNum: {
        type: Number,
        default: 0,
        required: true

    }
})

boardSchema.plugin(autoIncrement, {
    model: 'Board',
    field: 'boardId',
    startAt: 1
})

module.exports = mongoose.model('Board', boardSchema)
