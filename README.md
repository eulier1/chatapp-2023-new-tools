# Chatapp 2023

## Requirements
Install [Docker](https://www.docker.com/)

Then run 
```
docker compose up --build
```

Services running : 
- Frontend (Vue 3)
- Backend (Express & Socket.io)
- Database (MongoDB through MongoAltas)

## Notes :

### Architecture
For demo purpose we follow the MVC, which is something that is not recommeded for [node.js best practices apps](https://github.com/goldbergyoni/nodebestpractices#1-project-architecture-practices), for scalability.

Favor [DDD or Hexagon](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/) for production apps.

### ORM
[Prisma](https://www.prisma.io/docs/getting-started) a Database agnostic ORM.

Works well with MongoDB external URL, however when it comes to work with local docker instance it's quite challenge due MongoDB way of creating clusters. 
[Docker compose config to setup a MongoDB Replica Set for Prisma Client](https://github.com/prisma/prisma/discussions/22442).

For such reason, I favor [MongoAltas](https://www.mongodb.com/atlas/database). 

### Authentication workflow JWT and Socket.io

![workflow jwt and socket](https://i.imgur.com/Yk7tLeL.png)

### Demo

Youtube Demo Video
[![Youtube Demo](https://i.imgur.com/Uo31Bo2.png)](https://youtu.be/qbmxDjxRF_Y)

WIP

🏗️ A preview url