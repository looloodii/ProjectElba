var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: 'string',
    category: 'string',
    description: 'string',
    imageUrl: 'string'
});

module.exports = mongoose.model('Product', schema);

