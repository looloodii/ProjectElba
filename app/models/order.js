var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});

var OrderSchema = new mongoose.Schema({
    orderId: { type: String, unique:true },
    created: Date,
    updated: { type: Date, default: Date.now },
    status: String,

    userName: String,
    contactNumber: String,
    email: String,
    eventDate: Date,
    itemList: [ItemSchema],
    instructions: String,
    totalPrice: Number,
    pickupPoint: String
});

OrderSchema.path('orderId').index({ unique:true });

module.exports = mongoose.model('Order', OrderSchema);