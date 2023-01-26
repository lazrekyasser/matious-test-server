const mongoose = require('mongoose');

const SuperMarketSalesSchema = mongoose.Schema({
    invoiceID: {
        type: String,
        required: true,
        unique: true,
    },
    branch: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    customerType: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    productLine: {
        type: String,
        required: true,
    },
    unitPrice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    tax_5per: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,//mm/dd/yyyy
        validate: {
            validator: function (t) {
                return /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/.test(t);
                return /^((0?[1-9]|1[0-2])\/){2}[1-9]{4}$/.test(t)
            },
            message: props => `${props.value} is not a valid date!`
        }
    },
    time: {
        type: String,
        required: true,
        validate: {
            validator: function(t) {
                return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(t);
            },
            message: props => `${props.value} is not a valid time!`
        }
    },
    payment: {
        type: String,
        required: true,
    },
    cogs: {
        type: Number,
        required: true,
    },
    gross_margin_per: {
        type: Number,
        required: true,
    },
    gross_income: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Supermarketsale',SuperMarketSalesSchema);
