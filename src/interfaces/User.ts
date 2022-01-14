export interface BasicUser {
  id: number
}

export interface User extends BasicUser {
  userName: string
  firstName: string
  lastName: string
  password: string
}
