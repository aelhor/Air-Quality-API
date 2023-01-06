const axios = require('axios')
const cron = require('node-cron');
const airQuality = require('../../models/airQualityModel')
/*Implement CRON JOB to check “ air quality “ for the Paris zone ( latitude:
    48.856613 ,longitude: 2.352222) every 1 minute than save them in the
    database ( add date and time when saving the air quality)
    ● (optionnel:) add an endpoint to get datetime( date and time ) where the paris
    zone is the most polluted ( based on your CRON JOB results).*/

const airQualityCorn = async (req, res) => {
    try {
        const cornUrl = `http://localhost:5000/iqair`
        const url = `${cornUrl}?lat=48.856613&lon=2.352222`

        const {data} = await axios.get(url)
        console.log('Res :', data)
        // save the response in the db 
        const airQ = new airQuality({
            ts: data.Result.Pollution.ts,
            aqius: data.Result.Pollution.aqius,
            mainus: data.Result.Pollution.mainus,
            aqicn: data.Result.Pollution.aqicn,
            maincn :data.Result.Pollution.maincn 
        })
        const savedAirQ = await airQ.save()
        console.log('savedAirQ: ', savedAirQ)

    } catch (error) {
        if (error.response) {
            console.log(error.response);
        } else {
            console.log('Error: ', error);
        }
    }
}


cron.schedule('* * * * *', airQualityCorn);