# Documentation

## Install Instructions
### Frontend
Follow these instructions to run our Covid Information Site.\
No installations are required to run the frontend of the website.
1. Clone the repository.
2. Open index.html.
3. Run index.html and start debugging.
4. When prompted to open the site with another application, choose 
   Google Chrome.

### Backend
You will need to install the following dependencies within server.\
From root directory:
```
    "better-sqlite3": "7.5.1",
    "express": "4.18.0",
    "minimist": "1.2.6",
    "morgan": "1.10.0"
```

## Run Instructions

Command "npm install" will install all necessary dependencies.

Command "npm run start" will run the app on port 5000. Accessable on a web browser at http://localhost:5000/

Command "npm test" will run the app on port 5000 with the debug option set to true. This will allow access to the 'users' and 'access' databases.

#  API Documentation

## Endpoints

### /app/ (GET)

#### Request cURL

```
curl http://localhost:5000/app
```

#### Response body

```
{"message":"200 OK"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/plain      
status: 200
Date: Sun, 01 May 2022 20:18:34 GMT
Connection: keep-alive        
Keep-Alive: timeout=5
```

### /app/log/users (GET)

#### Request cURL

```
curl http://localhost:5000/app/log/users
```

#### Response body

```
{"id":1,"name":"exampleUser","email":"examplePass","phone":"555-555-5555","message":"this is an example"},
{"id":2,"name":null,"email":null,"phone":null,"message":null},
{"id":7,"name":"Andrew King","email":"sdvfghedrgh@live.unc.edu","phone":"3362090095","message":"asd"},
{"id":8,"name":"pranav","email":"dgvfvhdgfhd@gmail.com","phone":"222222222","message":"hey"},
{"id":9,"name":"example","email":"example@example.com","phone":"5555555555","message":"whatever"},
{"id":10,"name":"","email":"","phone":"","message":""},
etc...
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 757
ETag: W/"2f5-N9659ZFFnVzs2jCDXI5JzuCJChU"
Date: Sun, 01 May 2022 20:31:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/access (GET)

#### Request cURL

```
curl http://localhost:5000/app/log/access
```

#### Response body

```
{"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651437381391.0","method":"GET","url":"/app/log/access","protocol":"http","httpversion":"1.1","secure":"false","status":"200.0","referer":null,"useragent":"curl/7.80.0"},
etc...
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 45827
ETag: W/"b303-YuNXiejJYyPeEP8X2L67Kzl9mCw"
Date: Sun, 01 May 2022 20:42:43 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /Endpoint not found (GET)

#### Request cURL

```
curl http://localhost:5000/x
```

#### Response body

```
404 Not Found
```

#### Response headers

```
HTTP/1.1 404 Not Found
X-Powered-By: Express
Content-Type: text/plain; charset=utf-8
Content-Length: 13
ETag: W/"d-W2UDc1HK6w5aSNlj1/+ojQJx1UY"
Date: Sun, 01 May 2022 20:35:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### contact.html/app/user/create (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"name":"t", "email":"na", "phone":"1", "message":"na"}' http://localhost:5000/contact.html/app/user/create
```

#### Response body

```
{"name":"t","email":"na","phone":"1","message":"na"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 52
ETag: W/"34-1ptYJDxzRwK3biUDuJVtuM2x7NE"
Date: Sun, 01 May 2022 21:16:22 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

## Endpoints not yet fully implemented:

### /app/user/update (POST)
#### Update user information database with given information
### /app/user/delete (POST)
#### Delete a registered user from the database

