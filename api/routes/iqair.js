const express = require('express')
const axios = require('axios')
const router = express.Router()

const { validate } = require('../../utils')


router.get('/', async (req, res) => {
    // console.log(process.env.KEY)
    const { error } = validate(req.query);
    if (error) return res.status(400).send(error.details[0].message);

    const apiUrl = `http://api.airvisual.com/v2/nearest_city`
    const url = `${apiUrl}?lat=${req.query.lat}&lon=${req.query.lon}&key=${process.env.KEY}`
    try {
        const { data } = await axios.get(url);
        res.send({
            Result: {
                'Pollution': data.data.current.pollution
            }
        })

    } catch (err) {
        if (err.response) {
            if (err.response.data.data.message == "city_not_found") {
                res.status(400).send(err.response.data.data.message);

            } else if (err.response.data.data.message == "Too Many Requests") {
                res.status(400).send(err.response.data.data.message);
            } else {
                res.status(500).send({
                    "message": "Server Error!."
                });
            }
        } else {
            res.status(500).send({
                "message": "Server Error!"
            });
        }
    }
})



module.exports = router