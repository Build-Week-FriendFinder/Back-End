# Friend Finder API #

## Base API: ##
https://friend-finder-levi.herokuapp.com/api
(All CRUD calls will be made to this url + /[listed endpoint])

## Auth Endpoints: ##

### Register ###

POST /auth/register

Creates a new user.

Example request body: 

```
{ 
    "name": "Levi",
    "email": "levi@email.com",
    "password": "lambda4ever",
    "dob": "1994-09-21"
}
```

Email must be unique/cannot already exist in database.

"dob" = "Date of Birth

Successful status (201):
Responds with newly created User object.

### Login ###

POST /auth/login

Logs user in and provides Authentication token to be stored client-side.

Example request body:

```
{
    "email": "levi@email.com",
    "password": "lambda4ever"
}
```

Successful status (200):
Responds with:

```
{
    message: "Welcome {user's name}!",
    user_id: {user's user_id},
    token: ${auth_token}
}
```

___
Be sure to save the ${auth_token} to local storage as all requests below this point require it as a header,
ie: (authorization: ${auth_token}) should be part of your req.header in your axiosWithAuth function.
___

## User Endpoints: ##

### Get List of all Users ###

GET /user

Gets list of all users in the database.

Successful status (200):
Responds with array of users from the database.

### Get User by ID ###
### Get User's Hobbies ###
### Add Hobby to User ###
### Remove Hobby from User ###
### Edit/Update User ###
### Delete User ###
### Get a List of Swipeable Users ###
### Get List of Users Who Have Requested the User ###

## Message Endpoints: ##

### Send Message ###
### Get Messages Between Two Users ###

## Friend Endpoints: ##

### Get User's Friends ###
### Delete Friend ###

## Swipe Endpoints: ##

### Decline Swipe ###
### Request Swipe ###

## Error Responses ##