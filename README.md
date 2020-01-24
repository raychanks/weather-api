install docker

run `docker-compose up`

use postman for testing the api

first, go to `localhost:3000/token` to obtain the jwt

then, go to `localhost:3000/weather` to get the weather data

for the `/weather` route, you will need to include the jwt obtained from `/token`

in the headers, include

headers-key: Authorization

headers-value: Bearer {the_token_obtained_before}
