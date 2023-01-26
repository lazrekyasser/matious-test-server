const express = require('express')
const router = express.Router();
const Supermarketsale = require('../models/SuperMarketSales')

router.get('/', async (req, res) => {
    let totaleRatingMale = 0, lengthMale = 0, totaleRatingFemale = 0, lengthFemale = 0;
    try {
        await (
            async () => {
                const maleCursor = Supermarketsale.find({ gender: 'Male' }).cursor();
                for (let doc = await maleCursor.next(); doc != null; doc = await maleCursor.next()) {
                    totaleRatingMale += doc.rating;
                    lengthMale += 1;
                }
            }
            )();
            await (
                async () => {
                    const femaleCursor = Supermarketsale.find({ gender: 'Female' }).cursor();
                    for (let doc = await femaleCursor.next(); doc != null; doc = await femaleCursor.next()) {
                        totaleRatingFemale += doc.rating;
                        lengthFemale += 1;
                }
            }
        )();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'internal server error'
        })
    }

    return res.json({
        male: totaleRatingMale / lengthMale,
        female: totaleRatingFemale / lengthFemale
    })
})

module.exports = router;