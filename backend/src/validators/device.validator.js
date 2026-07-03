const Joi = require("joi");

const updateDeviceSchema = Joi.object({
    status: Joi.boolean().required()
});

module.exports = {
    updateDeviceSchema
};