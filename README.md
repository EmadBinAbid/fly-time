# Fly Time

**Fly Time** is a one-stop-solution for all your air travelling queries. Using **Fly Time** APIs, you can easy create products, solutions, and interfaces that allow users to easily manage and plan their trips with minimum travelling time. 

## Features
Currently, we support the following features as part of **Fly Time** API solution.
- Information about flights with minimum travel time from one airport to another

## API Endpoints
Following are the API endpoints that **Fly Time** API solution currently supports.

### Flights
- `[GET] /flight/v1/get_lowest_travel_time_flights`

## Technologies
- Node.js (with Express)
- ArangoDB

## Local Fly Time Setup
To set up **Fly Time** and run it locally, clone the repository in any directory, say `~/code`.

`git clone https://github.com/EmadBinAbid/fly-time`

Navigate into repository's root folder and install required node packages by running `npm install`.

If you already have ArangoDB installed then you can skip this part. If not, go ahead and download it for your environment from https://www.arangodb.com/download-major. Once downloaded, follow the steps mentioned in the corresponding documentation link to install and set up ArangoDB locally in your environment. 

Once ArangoDB is installed and up-and-running, we need to set up a dedicated database with necessary collections and populate the collections with data. The data that is supplied to collections should be in specific format in order for Fly Time to understand, compute, and interpret the results properly. You may find sample CSV files for data population inside collection here in this Google Drive folder: https://drive.google.com/file/d/1prwED7qeSetpQAzSaavgqNWb__uAOCOT.

To create a dedicated database and collections inside it, move inside the Arango shell by running   `arangosh` in your terminal window. 

To create a new database:

`db._createDatabase('fly-time')`

To create collections inside `fly-time` database:

`db._useDatabase('fly-time')`

`db._createDocumentCollection('airports')`

`db._createEdgeCollection('flights')`

To create index for efficient retrieval:

`db.flights.ensureIndex({type: "persistent", fields:["_from", "Year", "Month", "Day"]})`

Note: The above fields will obviously vary based on the dataset that you are using or the names of columns in your collection. 

If you are importing data from CSV files, use the following commands to populate the `airports` and `flights` collections in the `fly-time` database. 

`arangoimport --file "airports.csv" --type csv --collection "airports" --server.database "fly-time"`
`arangoimport --file "flights.csv" --type csv --collection "flights" --server.database "fly-time"`

**Fly Time** does not restrict you to strictly use its recommended database instance i.e. `fly-time`. You can configure your own instance by setting up the following environment variables.

- `ARANGO_DB_USER`
- `ARANGO_DB_PASSWORD`
- `ARANGO_DB_NAME`
- `ARANGO_DB_HOST`
- `ARANGO_DB_PORT`

If these environment variables are not set, **Fly Time** will default to `root`, `root`, `fly-time`, `localhost`, and `8529` for ArangoDB user, password, database name, host, and port respectively. 

After setting up the database and environment, we have the **Fly Time** infrastructure ready. Navigate inside the repository's root directory and run `node index.js` to start the **Fly Time**'s flight API server.

## Fly Time Setup With Docker
**Fly Time** is Docker compatible. You can easily create a Docker container using `docker-compose.yml` file and ship that container to production environment without having to locally setup the entire project. 

Note: If you have the ArangoDB instance running locally, make sure to set the environment variable `ARANGO_DB_HOST` as `host.docker.internal`.

Clone the repository: 

`git clone https://github.com/EmadBinAbid/fly-time`

Build the container:

`docker-compose build`

Run the container:

`docker-compose up -d`

Note: **Fly Time** does not support automatic deployment of containers for now. But, we have an issue open on it and will soon come up with a Kubernetes infrastructure that will allow the installation of `fly-time` as well as `db` containers in a fully-managed orchestrated environment. 

## Postman Collection
You can find sample API calls for each of the endpoints mentioned above in the **Fly Time** Postman collection inside `docs` directory. You only need to import the collection in Postman and you will be able to view and execute API calls all at one place.

## Maintainers
- Emad Bin Abid (https://linkedin.com/in/emadbinabid)