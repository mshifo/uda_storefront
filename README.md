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
```

Create a .env file for the database connection using the the template in the file

```
.env.example
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
