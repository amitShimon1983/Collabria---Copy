# harmon.ie Collabria

This is the monorepo for the harmon.ie Collabria platform.

## Creating Environment
Before strating to work with this platfom, we need to create azure cloud resources needed for this system.

### General Resource Group

---
The general resource group contains resources that will serve all stages resource groups.

We run this command only one time for each azure subscription.
```
LOCATION=<location> yarn infrastructure:deploy-general
```
For example:
```
LOCATION=westeurope yarn infrastructure:deploy-general
```

### Stage Resource Group

---
Stages are useful for creating environments for development and testing (dev, test, staging...).

_For windows use `cross-env` at the beginning of the command._
```
LOCATION=<location> STAGE=<stage> yarn infrastructure:deploy-stage
```
For example:
```
LOCATION=westeurope STAGE=Dev yarn infrastructure:deploy-stage
```

## Setup
Simply run `yarn` at the root of the repository.

### Docker container for MongoDb
Use following docker command to create local mongodb with replica set:

```
docker run -d -p 27001:27001 -p 27002:27002 -p 27003:27003 --name mongo -v ~/mongodb:/data -e "REPLICA_SET_NAME=mongo-rs" --restart=always flqw/docker-mongo-local-replicaset
```

Use following connection string to connect:
```
CONNECTION_STRING=mongodb://localhost:27001/teamMate?replicaSet=mongo-rs
```

## Azure Pipeline (no need)
Before running the pipeline you should build and push the base docker image to the container registry that was created in the general resource group.
The base docker image contains all the programs needed for the pipeline.
```
az acr login --name collabriacontainerregistry.azurecr.io
docker build -t collabria-pipeline-base -f DockerfileBase .
docker tag collabria-pipeline-base collabriacontainerregistry.azurecr.io/collabria-pipeline-base:latest
docker push collabriacontainerregistry.azurecr.io/collabria-pipeline-base:latest
```

## Run server inside Docker
```
docker build -t collabria-server .
docker run -p 3978:3978 --network="host" --rm collabria-server
```
