
## API Endpoints

#### Users:

- login: POST /users/login *for example:
```json
{
    "userName" : "maud8",
    "password": "158888888888888888678"
}
```

- list users: GET /users: *token required

- get users: GET /users/:id *token required

- add user: POST /users *for example:
```json
{
    "firstName": "John",
    "lastName": "Doe",
    "password": "Password",
    "password_confirmation": "Password",
    "userName": "s44444"
}
```

### Products
- list products: GET /products 
- get product by id: GET /products/:id
- create product: POST /products *token required *for example:
```json
{
    "name": "Apple",
    "price": 1.5
}
```

### Orders
- create order: POST /orders *token required *for example:
```json
{
    "user_id": 1,
    "product_id" : 2,
    "quantity" : 3
}
```

- get user orders by user id: GET /orders/:user_id *token required

------------------------------

## Database Schema

#### poducts

| Field        | Type             | 
| ------------ | ---------------- | 
| **id**       | **Serial**       |
| **name**     | **Varchar(100)** |
| **price**    | **Float**        |   

#### users

| Field               | Type             | 
| ------------------- | ---------------- | 
| **id**              | **Serial**       | 
| **userName**        | **Varchar(100)** | 
| **firstName**       | **Varchar(100)** | 
| **lastName**        | **Varchar(100)** | 
| **password**        | **Varchar(255)** | 

#### orders

| Field       | Type             | 
| ----------- | ---------------- |
| **id**      | **Serial**       | 
| **status**  | **enum**         | 
| **user_id** | **Integer**      | 

#### order_items

| Field          | Type             |
| -------------- | ---------------- | 
| **id**         | **Serial**       |
| **quantity**   | **Integer**      |
| **order_id**   | **Integer**      | 
| **product_id** | **Integer**      |
