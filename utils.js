const joi = require('joi');


const validate = (req) => {
    const schema = joi.object({
        lat: joi.number().min(-90).max(90).required(),
        lon: joi.number().min(-180).max(180).required()
    });
    return schema.validate(req);
}

module.exports = {validate}