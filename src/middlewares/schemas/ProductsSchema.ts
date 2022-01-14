import Joi from 'joi'

const ProductCreateSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().required().min(1)
})

export default ProductCreateSchema
