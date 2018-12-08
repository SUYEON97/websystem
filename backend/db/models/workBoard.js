const { mongoose, autoIncrement } = require('../mongo')

const workBoardSchema = new mongoose.Schema({
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
    },
    major_name:{
        type: String,
        required : true
    },
    subject_name:{
        type: String,
        required : true
    }

})

workBoardSchema.plugin(autoIncrement, {
    model: 'workBoard',
    field: 'boardId',
    startAt: 1
})

module.exports = mongoose.model('workBoard', workBoardSchema)
