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
$ curl -X PUT http://localhost:18080/api/clients/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro updated","email": "alejovic@update.com","image": "URL_1"}'

# delete
$ curl -X DELETE http://localhost:18080/api/clients/1


## routes
$ curl http://localhost:18080/api/option1/clients
$ curl http://localhost:18080/api/option2/clients
$ curl http://localhost:18080/api/option3/clients



## mongoose test
$ curl http://localhost:18080/api/nosql/clients

$ curl -X POST http://localhost:18080/api/nosql/clients \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'

