const mongoose = require('mongoose')

const { Schema } = mongoose

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  star: {
    index: String,
    name: String,
    type: String,
    price: Number,
  },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
