
# Global ecommerce Nest js




## Tech Stack

**Server:** Node, Nest js, Prisma ORM, Postgress, Redis


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


## Environment Variables

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

## Deployment

To deploy this project run

```bash
  docker-compose up
```

## Roadmap


- Add more integrations

