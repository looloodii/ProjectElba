var Product = require('../models/product');

module.exports.create = function(req, res){
    var product = new Product(req.body);
    product.save(function(err, result){
        res.json(result);
    });
};

module.exports.list = function(req, res){
    Product.find({}, function (err, results){
        res.json(results);
    })
};