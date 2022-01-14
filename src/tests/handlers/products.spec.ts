import supertest from 'supertest'
import app from '../../index'
import { UserType } from '../../interfaces/User'

// create a request object
const request = supertest(app)

describe('Testing Products Endpoints', () => {
  const user: UserType = {
    firstName: 'John',
    lastName: 'Doe',
    password: 'Password',
    password_confirmation: 'Password',
    userName: (Math.random() + 1).toString(36).substring(7)
  }
  let token: string
  let productId: number
  it('Testing post /users', async () => {
    await request
      .post('/users')
      .send(user)
      .expect(200)
      .then((res) => {
        token = res.body.token
      })
  })

  it('Testing post /products', async () => {
    await request
      .post(`/products`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'testProduct', price: 11.5 })
      .expect(200)
  })

  it('Testing post /products invalid token', async () => {
    await request
      .post(`/products`)
      .set('Authorization', `Bearer not-valid-token`)
      .send({ name: 'testProduct', price: 11.5 })
      .expect(401)
  })

  it('Testing get /products', async () => {
    await request
      .get('/products')
      .expect(200)
      .then((res) => {
        productId = res.body[0].id
      })
  })

  it('Testing get /products/:id', async () => {
    await request.get(`/products/${productId}`).expect(200)
  })

  it('Testing get /products/:id- invalid product id', async () => {
    await request.get(`/products/99999`).expect(404)
  })
})
