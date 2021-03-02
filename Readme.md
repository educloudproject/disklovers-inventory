# DiskLovers - Inventory Service

The Inventory microservice of the DiskLovers application is a Catalog of items for sale, such as 4K Ultra HD Blu-Ray disks, Blu-Ray disks, and DVDs. You might even find a VHS cassette...

## Pre-requisites

This microservice uses its own MongoDB Database. This must be running (such as in a Docker container) before starting the microservice.

### Running MongoDB as a Docker container

1. Run the following command to start MongoDB as a Docker container locally (if not already running), listening on Port 27017:

```
docker run --name disk-lovers-inventory -p 27017:27017 -d mongo:latest
```

By default, this Microservice uses a MongoDB database named `disk-lovers-inventory-service`, and stores Items in a Collection named `movies`.

## Launching the Inventory Microservice

In a terminal/console window, ensure you are in the project directory, and run the following command:

```
node app.js
```

The microservice is now running locally on port `3000`.

# Using the Inventory Microservice (RESTful API Reference)

The following are sample `curl` commands that can be executed from a terminal/console window to interact with the Inventory Microservice - the commands demonstrate the RESTful API exposed:

1. Add an Item to the Inventory (where the JSON object `{"title": "Star Wars"}` is the Item body to be added in this example - there is currently no validation on what data this JSON object contains):

    ```
    curl -X POST localhost:3000/movies -d '{"title": "Star Wars"}' -H 'Content-type: application/json'
    ```

    **Note:** All Items added to the Inventory are assigned a randomly generated ID as part of the Item body automatically - do not attempt to specify your own. You can see the assigned IDs with the List all command (see Step 2 below).

2. List all Items in the Inventory:

    ```
    curl localhost:3000/movies -H 'Accept: application/json'
    ```

3. Get a specific Item from the Inventory by Item ID (where `603ccaf7f9493727f08e9d95` is the ID in this example):

    ```
    curl localhost:3000/movies/603ccaf7f9493727f08e9d95 -H 'Accept: application/json'
    ```

4. Delete a specific Item from the Inventory by Item ID (where `603ccaf7f9493727f08e9d95` is the ID in this example):

    ```
    curl -X DELETE localhost:3000/movies/603ccaf7f9493727f08e9d95 
    ```