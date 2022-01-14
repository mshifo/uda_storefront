export interface User {
  [x: string]: any;
  id?: number
  userName: string
  firstName: string
  lastName: string
  password: string
}

export interface UserType {
  userName: string
  firstName: string
  lastName: string
  password: string
  password_confirmation: string
}
