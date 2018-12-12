const { mongoose, autoIncrement } = require('../mongo')

const deadLineSchema = new mongoose.Schema({
    hwId: {
      type: Number,
      unique: true
    },
    userId: {
      type: String,
      required: true
    },
    major_name: {
      type: String,
      required: true
    },
    subject_name: {
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
    timeRemaining: Number,
    status: Number
  })

  deadLineSchema.plugin(autoIncrement, {
    model: 'User',
    field: 'hwId',
    startAt: 0
  })

module.exports = mongoose.model('Deadline', deadLineSchema)
