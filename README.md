# Gamify
## IBM Intern Introduction Project 
### Requirements
To run this project you'll also need to run the middleware, please refer to [its corresponding page](https://github.com/andresdanielmtz/gamify-api)


### Installation
To run this project, use the following commands 

```
git clone https://github.com/andresdanielmtz/gamify-app
npm i
```

In another terminal instance, use the following commands 

```
git clone https://github.com/andresdanielmtz/gamify-api
python3 -m venv .venv
. .venv/bin/activate
pip -r install requirements.txt
```

This will ensure you will have installed all the dependencies necessary to run this project. :) 

### Environment Variables 
In order to run this project you will need the necessary tokens. This project (frontend) requires of the backend endpoint

1. Create an `.env` file and put the following in there:
```
VITE_BACKEND_ENDPOINT = [Backend URL (HTTP / HTTPS)]
VITE_URL_IGDB = [IGDB Endpoint]
VITE_CLIENT_ID = [IGDB Token]
VITE_CLIENT_SECRET = [IGDB Token]
VITE_AUTH_IGDB = [IGDB Token]
VITE_TOKEN_TYPE = [IGDB Token]
VITE_ACCESS_TOKEN = [IGDB Token]
VITE_TOKEN_TYPE=bearer
```

Please refer to [IGDB Documentation](https://api-docs.igdb.com/#getting-started) for more information about how to get IGDB tokens and endpoint. 

2. In `gamify-api`, create an `.env`file too.

```
TEST=HELLOWORLD
CLIENT_ID = [IGDB Token]
CLIENT_SECRET = [IGDB Token]
AUTH_IGDB = [IGDB Token]
TOKEN_TYPE=bearer
URL_IGDB= [IGDB Endpoint]
ACCESS_TOKEN = [IGDB Token]
```

The project must be running on `http://localhost:5173`, notice that it is running on the HTTP protocol.