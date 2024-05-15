STEP 1 : git clone https://github.com/RohitPrajapat08/send-email-api.git

STEP 2 : npm i 

STEP 3 : npm start

STEP 4 : Create .env and Add the details 

STEP 5 : hit the api using Postman

API_Curl : 
curl --location 'http://localhost:8000/send-email' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "example@gmail.com"
}'