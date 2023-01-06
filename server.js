const app = require('express')()
const dotenv = require('dotenv')
const cors = require("cors")
const mongoose = require('mongoose')
const iqair = require('./api/routes/iqair')
const mostPolParis= require('./api/routes/mostPolParis')
dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}, (err) => {
    if (err) console.log(err)
    else console.log("mongdb is connected");
})



app.use(cors())

// Routes
app.use('/iqair', iqair)
app.use('/paris', mostPolParis)

// Corn 
// require('./api/corn/airQuality')


const port = process.env.PORT || 5000

app.listen(port, () => console.log(`listening on ${port}`))