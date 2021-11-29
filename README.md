# How to run

```shell script
docker build -t mytest .
docker run -v $(pwd):/mnt -p 9090:9090 -w /mnt mytest ./scripts/build.sh
docker run -v $(pwd):/mnt -p 9090:9090 -w /mnt mytest ./scripts/tests.sh

# Run the API version of the game exposed on the port 9090
docker run -v $(pwd):/mnt -p 9090:9090 -w /mnt mytest ./scripts/run.sh
# Run the CLI version of the game
docker run -i -v $(pwd):/mnt -w /mnt mytest ./scripts/run-cli.sh
```


# API Version

In the API version there is an endpoint `POST /game` exposed on the port 9090

Example of use:
```shell script
curl -L -X POST 'http://localhost:9090/game' \
-H 'Content-Type: application/json' \
--data-raw '{
    "map": {
        "rooms": [
            {
                "id": 1,
                "name": "Hallway",
                "north": 2,
                "objects": []
            },
            {
                "id": 2,
                "name": "Dining Room",
                "south": 1,
                "west": 3,
                "east": 4,
                "objects": []
            },
            {
                "id": 3,
                "name": "Kitchen",
                "east": 2,
                "objects": [
                    {
                        "name": "Knife"
                    }
                ]
            },
            {
                "id": 4,
                "name": "Sun Room",
                "west": 2,
                "objects": [
                    {
                        "name": "Potted Plant"
                    }
                ]
            }
        ]
    },
    "startRoomId": 2,
    "objectsToCollect": [
        "Knife",
        "Potted Plant"
    ]
}'
```

# CLI Version

The CLI version ask the user to choose one of the map 
in the folder /mnt/maps inside the container.
