## postgres test

## default
# findAll
$ curl http://localhost:18080/api/users

# findById
$ curl http://localhost:18080/api/users/1

# create
$ curl -X POST http://localhost:18080/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'

# update
$ curl -X PUT http://localhost:18080/api/users/9 \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro updated","email": "alejovic@update.com","image": "URL_1"}'

# delete
$ curl -X DELETE http://localhost:18080/api/users/9

#################################################################################################################
## option1
$ curl http://localhost:18080/api/option1/users
$ curl http://localhost:18080/api/option1/users/1
$ curl -X POST http://localhost:18080/api/option1/users \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'
$ curl -X PUT http://localhost:18080/api/option1/users/8 \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro updated","email": "alejovic@update.com","image": "URL_1"}'
$ curl -X DELETE http://localhost:18080/api/users/8

#################################################################################################################
## option3
$ curl http://localhost:18080/api/option3/users
$ curl http://localhost:18080/api/option3/users/7
$ curl -X POST http://localhost:18080/api/option3/users \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'
$ curl -X PUT http://localhost:18080/api/option3/users/7 \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro updated","email": "alejovic@update.com","image": "URL_1"}'
$ curl -X DELETE http://localhost:18080/api/users/7

#################################################################################################################
## sequelize test
$ curl http://localhost:18080/api/sequelize/users

$ curl -X POST http://localhost:18080/api/sequelize/users \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'


#################################################################################################################
#################################################################################################################


## mongoose test
$ curl http://localhost:18080/api/nosql/users

$ curl -X POST http://localhost:18080/api/nosql/users \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'

