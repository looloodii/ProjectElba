var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    totalprice: Number
});

var OrderSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    status: String,
    userName: String,
    contactName: String,
    contactPhone: String,
    contactEmail: String,
    pickupDate: Date,
    itemList: [ItemSchema],
    instructions: String,
    totalPrice: Number,
    pickupLocation: String
});

OrderSchema.path('userName').index();

module.exports = mongoose.model('Order', OrderSchema);