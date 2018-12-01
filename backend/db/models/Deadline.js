const { mongoose, autoIncrement } = require('../mongo')

const deadLineSchema = new mongoose.Schema({
    hwId: {
      type: Number,
      unique: true
    },
    userId: {
      type: Number,
      required: true
    },
    major_name: {
      type: String,
      required: true
    },
    hw_name: {
      type: String,
      required: true
    },
    hw_date: {
      type: Date,
      required: true
    },
    timeRemaining: Number
  })
  
  deadLineSchema.plugin(autoIncrement, {
    model: 'User',
    field: 'hwId',
    startAt: 0
  })

module.exports = mongoose.model('Deadline', deadLineSchema)
