## postgres test

## default
# findAll
$ curl http://localhost:18080/api/clients

# findById
$ curl http://localhost:18080/api/clients/1

# create
$ curl -X POST http://localhost:18080/api/clients \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'

# update
$ curl -X PUT http://localhost:18080/api/clients/9 \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro updated","email": "alejovic@update.com","image": "URL_1"}'

# delete
$ curl -X DELETE http://localhost:18080/api/clients/9

#################################################################################################################
## option1
$ curl http://localhost:18080/api/option1/clients
$ curl http://localhost:18080/api/option1/clients/1
$ curl -X POST http://localhost:18080/api/option1/clients \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'
$ curl -X PUT http://localhost:18080/api/option1/clients/8 \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro updated","email": "alejovic@update.com","image": "URL_1"}'
$ curl -X DELETE http://localhost:18080/api/clients/8

#################################################################################################################
## option3
$ curl http://localhost:18080/api/option3/clients
curl http://localhost:18080/api/option3/clients/7
$ curl -X POST http://localhost:18080/api/option3/clients \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'
  curl -X PUT http://localhost:18080/api/option3/clients/7 \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro updated","email": "alejovic@update.com","image": "URL_1"}'
curl -X DELETE http://localhost:18080/api/clients/7

#################################################################################################################
#################################################################################################################
#################################################################################################################


## mongoose test
$ curl http://localhost:18080/api/nosql/clients

$ curl -X POST http://localhost:18080/api/nosql/clients \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'

