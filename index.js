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

//routes
const productLineRouter = require('./routes/productLines');
const customerTypeGenderRouter = require('./routes/customerTypeGender');
const moyenneRatingPerGenderRouter = require('./routes/ratingPerGender');
app.use('/product-line', productLineRouter);
app.use('/customer-type-gender', customerTypeGenderRouter);
app.use('/moy-rating-per-gender', moyenneRatingPerGenderRouter);

app.listen(3000, () => console.log('server starded...'))