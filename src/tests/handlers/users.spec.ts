import supertest from 'supertest'
import { JwtPayload, verify } from 'jsonwebtoken'
import app from '../../index'
import { UserType } from '../../interfaces/User'
import config from '../../helpers/config'

// create a request object
const request = supertest(app)

describe('Testing Users Endpoints', () => {
  const user: UserType = {
    firstName: 'John',
    lastName: 'Doe',
    password: 'Password',
    password_confirmation: 'Password',
    userName: (Math.random() + 1).toString(36).substring(7)
  }
  let token: string
  let userId: string
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

  it('Testing post /users invalid data', async () => {
    await request.post('/users').send({ firstName: 'test' }).expect(422)
  })

  it('Testing post /users/login', async () => {
    await request
      .post('/users/login')
      .send({ userName: user.userName, password: user.password })
      .expect(200)
  })

  it('Testing post /users/login wrong Credentials', async () => {
    await request
      .post('/users/login')
      .send({ userName: user.userName, password: '88888888' })
      .expect(422)
  })

  it('Testing get /users', async () => {
    await request.get('/users').set('Authorization', `Bearer ${token}`).expect(200)
  })

  it('Testing get /users not authenticated', async () => {
    await request.get('/users').expect(401)
  })

  it('Testing get /users/:id', async () => {
    await request.get(`/users/${userId}`).set('Authorization', `Bearer ${token}`).expect(200)
  })

  it('Testing get /users/:id not found', async () => {
    await request.get(`/users/999999`).set('Authorization', `Bearer ${token}`).expect(404)
  })
})
