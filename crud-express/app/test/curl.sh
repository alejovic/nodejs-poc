## postgres test

## default
$ curl http://localhost:18080/api/clients

$ curl -X POST http://localhost:18080/api/clients \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'


## routes
$ curl http://localhost:18080/api/option1/clients
$ curl http://localhost:18080/api/option2/clients
$ curl http://localhost:18080/api/option3/clients



## mongoose test
$ curl http://localhost:18080/api/nosql/clients

$ curl -X POST http://localhost:18080/api/nosql/clients \
  -H "Content-Type: application/json" \
  -d '{"name": "alejandro","email": "alejovic@gmail.com","image": "URL_1"}'

