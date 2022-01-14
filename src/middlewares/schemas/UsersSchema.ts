import Joi from 'joi'
import UserModel from '../../models/User.model'

// validate if username already exists
const lookup = async (userName: string) => {
  const user = await UserModel.findByUserName(userName)
  if (user) {
    throw new Error('User Name Already Exists')
  }
}

const UserCreateSchema = Joi.object().keys({
  userName: Joi.string().required().external(lookup),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().min(8),
  password_confirmation: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
})

const UserLoginSchema = Joi.object().keys({
  userName: Joi.string().required(),
  password: Joi.string().min(8)
})

export { UserCreateSchema, UserLoginSchema }
