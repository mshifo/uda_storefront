import supertest from 'supertest'
import { JwtPayload, verify } from 'jsonwebtoken'
import app from '../index'
import { UserType } from '../interfaces/User'
import config from '../helpers/config'

// create a request object
const request = supertest(app)

describe('Testing Orders Endpoints', () => {
  const user: UserType = {
    firstName: 'John',
    lastName: 'Doe',
    password: 'Password',
    password_confirmation: 'Password',
    userName: (Math.random() + 1).toString(36).substring(7)
  }
  let token: string
  let userId: string
  let productId: number
  it('Testing post /users', async () => {
    await request
      .post('/users')
      .send(user)
      .expect(200)
      .then((res) => {
        token = res.body.token
        const decodedJWT = verify(token, config.token_secret as string) as JwtPayload
        userId = decodedJWT.user.id
      })
  })

  it('Testing post /products', async () => {
    await request
      .post(`/products`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'testProduct', price: 11.5 })
      .expect(200)
  })

  it('Testing get /products', async () => {
    await request
      .get('/products')
      .expect(200)
      .then((res) => {
        productId = res.body[0].id
      })
  })

  it('Testing post /orders', async () => {
    await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: userId, quantity: 3, product_id: productId })
      .expect(200)
  })

  it('Testing post /orders invalid quantity', async () => {
    await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: userId, quantity: 0, product_id: productId })
      .expect(422)
  })

  it('Testing get /orders/:user_id', async () => {
    await request.get(`/orders/${userId}`).set('Authorization', `Bearer ${token}`).expect(200)
  })

  it('Testing get /orders/:user_id no token', async () => {
    await request.get(`/orders/${userId}`).expect(401)
  })
})
