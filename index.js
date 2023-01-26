require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false)


//connect to db
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
})
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.once('open', () => console.log('Connected to Database!'))
//
app.use(express.json());
app.get('/', (req, res) => {
    res.send('welcom to the super market sales api ');
})
//routes
mongoose.connection.on('connected', () => {
    const productLineRouter = require('./routes/productLines');
    const customerTypeGenderRouter = require('./routes/customerTypeGender');
    const moyenneRatingPerGenderRouter = require('./routes/ratingPerGender');
    app.use('/product-line', productLineRouter);
    app.use('/customer-type-gender', customerTypeGenderRouter);
    app.use('/moy-rating-per-gender', moyenneRatingPerGenderRouter);
})

let port = process.env.PORT || 3000;
app.listen(port, () => console.log('server starded...'))