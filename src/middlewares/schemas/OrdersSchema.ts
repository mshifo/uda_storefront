import Joi from 'joi'

const OrderCreateSchema = Joi.object().keys({
  product_id: Joi.number(),
  quantity: Joi.number().min(1),
  user_id: Joi.number()
})

export default OrderCreateSchema
