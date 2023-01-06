const express = require('express')
const router = express.Router()
const airQuality = require('../models/airQualityModel')


router.get('/', async (req, res) => {
    try {
        const airQ = await airQuality.findOne().sort('aqius').limit(1).select('_id createdAt')


        res.send({
                _id: airQ._id, 
                DateTime : airQ.createdAt
            })
    } catch (error) {
        res.send(error)
    }
})



module.exports = router