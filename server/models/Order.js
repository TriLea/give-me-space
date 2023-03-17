const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  stars: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Stars'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
