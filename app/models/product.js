var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
    name: { type:String, unique:true },
    category: String,
    description: String,
    imageUrl: String,
    status: String,
    price: Number,
    flavors: [String]
});

ProductSchema.path('name').index({ unique:true });

module.exports = mongoose.model('Product', ProductSchema);

