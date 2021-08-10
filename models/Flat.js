const mongoose = require('mongoose')
const { Schema } = mongoose

const flatSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  numOfRooms: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  // _user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Flat = mongoose.model('Flat', flatSchema)

module.exports = Flat
