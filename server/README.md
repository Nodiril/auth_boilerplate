# server

```
# install dependencies
yarn

# install knex globally - required for running migrations and seeds
yarn global add knex
```

The database connection is found in server/db/knexfile.js - adjust database_name, database_user, and database_user_password accordingly. I have chosen postgresql, but knex will also work with mysql and sqlite.

The database has to be created prior to running the knex migrate. Once database is set up we can run the migrate to create the table.

```
cd db

# create a new table users in the database with 3 columns (id, username, password)
knex migrate:latest

# insert seed data into table - adds one user with username: seedtest and password: password
knex seed:run

# start the graphql server on port 3000, graphql interface at http://localhost:3000/graphiql
yarn start
```



