var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});

var OrderSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    status: String,
    contactName: String,
    contactPhone: String,
    contactEmail: String,
    pickupDate: Date,
    itemList: [ItemSchema],
    instructions: String,
    totalPrice: Number,
    pickupLocation: String
});

//OrderSchema.path('orderId').index({ unique:true });

module.exports = mongoose.model('Order', OrderSchema);