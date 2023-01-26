const express = require('express')
const router = express.Router();
const Supermarketsale = require('../models/SuperMarketSales')

//getting productLine
router.get('/', async (req, res) => {
    let fashionAcc = 0, foodBeverage = 0, electroAcc = 0, sportsTravel = 0, homeLifestyle = 0, healthBeaty = 0;
    try {
        const cursor = Supermarketsale.find({ productLine: "Fashion accessories" }).cursor();
        await (async () => {
            for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
                fashionAcc += doc.quantity;
            }
        })()
        const cursor1 = Supermarketsale.find({ productLine: "Sports and travel" }).cursor();
        await (async () => {
            for (let doc = await cursor1.next(); doc != null; doc = await cursor1.next()) {
                sportsTravel += doc.quantity;
            }
        })()
        const cursor2 = Supermarketsale.find({ productLine: "Food and beverages" }).cursor();
        await (async () => {
            for (let doc = await cursor2.next(); doc != null; doc = await cursor2.next()) {
                foodBeverage += doc.quantity;
            }
        })()
        const cursor3 = Supermarketsale.find({ productLine: "Electronic accessories" }).cursor();
        await (async () => {
            for (let doc = await cursor3.next(); doc != null; doc = await cursor3.next()) {
                electroAcc += doc.quantity;
            }
        })()
        const cursor4 = Supermarketsale.find({ productLine: "Home and lifestyle" }).cursor();
        await (async () => {
            for (let doc = await cursor4.next(); doc != null; doc = await cursor4.next()) {
                homeLifestyle += doc.quantity;
            }
        })()
        const cursor5 = Supermarketsale.find({ productLine: "Health and beauty" }).cursor();
        await (async () => {
            for (let doc = await cursor5.next(); doc != null; doc = await cursor5.next()) {
                healthBeaty += doc.quantity;
            }
        })()
    }
    catch (err) {
        return res.status(500).json({
            message: 'internal server error',
        })
    }
    // console.log(fashionAcc, sportsTravel, foodBeverage, electroAcc, homeLifestyle, healthBeaty)
    return res.json({
        "Fashion accessories": fashionAcc,
        "Sports and travel": sportsTravel,
        "Food and beverages": foodBeverage,
        "Electronic accessories": electroAcc,
        "Home and lifestyle": homeLifestyle,
        "Health and beauty": healthBeaty
    })
})

module.exports = router;