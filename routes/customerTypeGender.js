const express = require('express')
const router = express.Router();
const Supermarketsale = require('../models/SuperMarketSales')

router.get('/', async (req, res) => {
    let normalMale = 0, normaleFemale = 0, memberMale = 0, memberFemale = 0;
    try {
        await (
            async () => {
                const normalCursor = Supermarketsale.find({ customerType: 'Normal' }).cursor();
                for (let doc = await normalCursor.next(); doc != null; doc = await normalCursor.next()) {
                    if (doc.gender === 'Male')
                        normalMale += 1;
                    else if (doc.gender === 'Female')
                        normaleFemale += 1;
                }
            }
        )();
        await (
            async () => {
                const memberCursor = Supermarketsale.find({ customerType: 'Member' }).cursor();
                for (let doc = await memberCursor.next(); doc != null; doc = await memberCursor.next()) {
                    if (doc.gender === 'Male')
                        memberMale += 1;
                    else if (doc.gender === 'Female')
                        memberFemale += 1;
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
        member: {
            male: memberMale,
            female: memberFemale,
        },
        normal: {
            male: normalMale,
            female: normaleFemale,
        }
    })
})

module.exports = router;