var nodemailer = require('nodemailer'),
    hbs = require('nodemailer-express-handlebars'),
    handlebars = require('express-handlebars'),
    path = require('path');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'shop.elbadiaries@gmail.com',
        pass: 'ordersAtElba'
    }
});

// setup e-mail data with unicode symbols
var shopElbaEmail = 'Shop Elba Diaries <shop.elbadiaries@gmail.com>';
var elbaEmail = 'theelbadiaries@gmail.com';

// send mail with defined transport object
var send = function(mailOptions) {

    transporter.use('compile', hbs({
        viewEngine: handlebars.create({}),
        viewPath: path.resolve(__dirname, './mailtmpls')
    }));

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            throw error;
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}

var buildOrderDetailsOptions = function(subject, orderDetails) {
    return {
        from: shopElbaEmail,
        to: orderDetails.contactEmail,
        bcc: elbaEmail,
        subject: subject,
        template: 'orderdetails',
        context: {
            orderid : orderDetails._id,
            items : orderDetails.itemList,
            contactname : orderDetails.contactName,
            pickupdate: orderDetails.pickupDate,
            pickuplocation : orderDetails.pickupLocation,
            totalprice : orderDetails.totalPrice,
            contactnumber : orderDetails.contactPhone,
            instructions: orderDetails.instructions
        }
    };
}

module.exports = {

    mailOrderDetails: function(orderDetails) {
        var subject = "Your Shop Elba Diaries Order " + orderDetails._id,
            mailOptions = buildOrderDetailsOptions(subject, orderDetails);

        send(mailOptions, function(err) {
            if (err) {
                console.log("Unable to send orderDetails email: " + err);
            }
        });
    },

    mailInquiry: function(inquiryDetails) {

    }
};
