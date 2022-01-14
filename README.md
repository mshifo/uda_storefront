# Storefront API
## Summary

API for storefront application.

## Endpoints

check the [requirements](REQUIREMENTS.md) file.

## Testing

```
npm run test
```
To start the unit testing

## Migration
 
Please use the following command to install db-migrate globally

```
npm install -g db-migrate
```

create the database "storefront"

```
psql -U username
# Enter Password
CREATE DATABASE storefront;
CREATE DATABASE storefront_test;
```

Create a .env file for the database connection using the the template in the file

```
.env.example
```

for example:
```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=storefront
DB_TEST_DATABASE=storefront_test
PORT=3000
BCRYPT_PASSWORD=my-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=my-token-secret
NODE_ENV=dev
```

and add your values

Then use the following command to migrate the tables automatically to your new database

```
db-migrate up
```

## Usage and Installation

You can get the project up and running in two simple steps.

Install the required packages using the following command.

```
npm install
```

You can then use the following command to run the project

```
npm run start
```

- Project runs on port 3000 or you can configure your own in .env file
- Database server runs on port 5432
