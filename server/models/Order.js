const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  star: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Star'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
