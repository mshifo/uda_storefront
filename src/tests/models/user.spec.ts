import { User } from '../../interfaces/User'
import UserModel from '../../models/User.model'

let user: User
const userToAdd: User = {
  firstName: 'John',
  lastName: 'Doe',
  password: 'Password',
  userName: (Math.random() + 1).toString(36).substring(7)
}
describe('Testing User Model', () => {
  it('Test add method', async () => {
    expect(UserModel.add).toBeDefined()
    user = await UserModel.add(userToAdd)
    expect({
      firstName: user.firstname,
      lastName: user.lastname,
      userName: user.username
    }).toEqual({
      firstName: userToAdd.firstName,
      lastName: userToAdd.lastName,
      userName: userToAdd.userName
    })
  })
  it('Test all method', async () => {
    expect(UserModel.all).toBeDefined()
    const result = await UserModel.all()
    expect(result).toContain(user)
  })

  it('Test find method', async () => {
    expect(UserModel.find).toBeDefined()
    const result = await UserModel.find(user.id as number)
    expect(result).toEqual(user)
  })

  it('Test find method | null', async () => {
    const result = await UserModel.find(99999)
    expect(result).toBeNull()
  })

  it('Test authenticate method', async () => {
    const result = await UserModel.authenticate(userToAdd.userName, userToAdd.password)
    expect(result).toEqual(user)
  })

  it('Test authenticate method | data invalid', async () => {
    const result = await UserModel.authenticate(userToAdd.userName, '123')
    expect(result).toBeNull()
  })

  it('Test find by user name', async () => {
    const result = await UserModel.findByUserName(userToAdd.userName)
    expect(result).toEqual(user)
  })
})
