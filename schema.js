const Joi = require('joi');

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    category: Joi.string().valid('trending','rooms','iconic','mountains','castles','pools','camping','farms','arctic','deserts').optional().allow(''),
    geometry: Joi.alternatives().try(
      Joi.object({
        lat: Joi.number().required(),
        lng: Joi.number().required()
      }),
      Joi.object({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array().items(Joi.number()).length(2).required()
      })
    ).optional(),
    image: Joi.object({
      url: Joi.string().allow('').optional()
    }).optional(),
    images: Joi.array().items(Joi.object({ url: Joi.string().required(), filename: Joi.string().optional() })).optional()
  }).required(),
  imageType: Joi.string().optional() // Allow imageType field to be present
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
