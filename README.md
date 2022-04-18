
# Global ecommerce Nest js




## Tech Stack

**Server:** Node, Nest js, Prisma ORM, Postgresql, Redis


## Features

- Show products based on geolocation
    - The first products are the products of the user's country
    - The second products are the products that have international shipping
    - And the last products are the products that do not have international shipping
 
- Product descriptions and prices are based on the user's geolocation
- Cache strategy using redis
- Swagger documentation under "/api/docs"
- CI/CD workflow
- Jwt auth
- Logs using google logging
- Pipelines to validate client requests
- Database migrations and seeder



## Run on Docker 🐳

Clone the project
```bash
  git clone git@github.com:Monge1h/ecommerce-nest.git
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### prisma database
`DATABASE_URL`

### redis
`REDIS_HOST`

`REDIS_PORT`

### Google cloud Logging  https://cloud.google.com/logging
`LOGGER_PROJECT_ID`

`LOGGER_KEY_FILENAME`

`LOGS_GCP`

### Jwt
`JWT_SECRET`


Create a .env file based on .env.example

To deploy this project run

```bash
  docker-compose up
```

## API Reference

Once the server starts running, you can go to: 

```http
  http://localhost:3005/api/docs/
```

## Roadmap


- Add more integrations

