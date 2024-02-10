# API authentication JWT

## Endpoints

## */register* 
### Headers
- Content-type: application/json
### body
        {
            "username" : "<<your_user>>",
            "password": "<<your_password>>"
        }

### expected respose
        {
            "id_user" : <<id_number>>, 
            "name_user" "<<your_user>>", 
            "token_user": "<<your_JWT_token>>"
        }

## */login* 
### Headers
- Content-type: application/json
### body
        {
            "username" : "<<your_user>>",
            "password": "<<your_password>>"
        }

### expected respose
        {
            "username" : <<id_number>>, 
            "name_user" "<<your_user>>", 
            "token_user": "<<your_JWT_token>>"
        }


