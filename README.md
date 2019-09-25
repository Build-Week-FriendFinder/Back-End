# Friend Finder API #

## Base API: ##
https://friend-finder-levi.herokuapp.com/api
(All CRUD calls will be made to this url + /[listed endpoint])

## Auth Endpoints: ##

### Register ###

> Listed endpoint:
>> POST /auth/register

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

> Listed endpoint:
>> POST /auth/login

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

> Listed endpoint:
>> GET /user

Gets list of all users in the database.

Successful status (200):
Responds with array of users from the database.

### Get User by ID ###

> Listed endpoint:
>> GET /user/:user_id

Gets an individual user by their user id.

Successful status (200):
Responds with array containing the specific user object.

ie:

```
{
    "user_id": "6",
    "name": "Levi",
    "email": "levi@email.com",
    "password": "lambda4ever",
    "dob": "1994-09-21",
    "gender": "Male",
    "coordinates": NULL,
    "location": NULL,
    "profile_img": NULL,
    "bio": NULL
}
```

### Get User's Hobbies ###

> Listed endpoint:
>> GET /user/hobbies/:user_id

Gets a list of all hobbies added under the user's id.

Successful status (200):
Responds with array containing the user's hobbies.

ie:

```
[
{
    "hobby_id": "1",
    "name": "Reading"
}
]
```

### Add Hobby to User ###

> Listed endpoint:
>> POST /user/hobbies/:user_id

Adds a hobby to the hobbies table under the user's id.

Example request body:

```
{
    "name": "Skydiving"
}
```

Successful status (201):
Responds with the newly added hobby.

ie:

```
{
    "hobby_id": "9",
    "name": "Skydiving"
}
```

### Remove Hobby from User ###

> Listed endpoint:
>> DELETE /user/hobbies/:user_id/:hobby_id

Removes a hobby from the user's list of hobbies.

Successful status (200):
Responds with:

```
{
    message: "Hobby removed."
}
```

### Edit/Update User ###

> Listed endpoint:
>> PUT /user/:user_id

Updates a user's information.

Example request body:

```
{
    "user_id": "6",
    "name": "Levi",
    "email": "levi@email.com",
    "password": "lambda4ever",
    "dob": "1994-09-21",
    "gender": "Male",
    "coordinates": NULL,
    "location": NULL,
    "profile_img": NULL,
    "bio": "This is my newly updated bio"
}
```

Successful status (201):
Responds with:

```
{
    message: "User updated successfully."
}
```

### Delete User ###

> Listed endpoint:
>> DELETE /user/:user_id

Deletes a user from the database.

Successful status (200):
Responds with:

```
{
    message: "User with id: ${user_id} successfully deleted."
}
```

### Get a List of Swipeable Users ###

> Listed endpoint:
>> GET /user/:user_id/swipeable

Returns a list of users who have not been swiped by the active user (useful for presenting new users for the user to swipe on).

Successful status (200):
Responds with either:

```
[
    {
        user_object1
    },
    {
        user_object2
    },
    {
        user_object3
    }
]
```

or:

```
{
    message: "You've swiped on all available users!"
}
```

if there are no more swipeable users.

### Get List of Users Who Have Requested the User ###

> Listed endpoint:
>> GET /user/:user_id/requests

Returns a list of users who have swiped on you and have requested your friendship.

Successful status (200):
Responds with either:

```
[
    {
        user_object1
    },
    {
        user_object2
    },
    {
        user_object3
    }
]
```

or:

```
{
    message: "You have no requests currently."
}
```

if there are no requests.

## Message Endpoints: ##

### Send Message ###

> Listed endpoint:
>> POST /messages/:user_id/:friend_id

Sends a message from the user (indicated by the user_id) to a friend (indicated by the friend_id).

Example request body:

```
{
    "message": "Hello friend!"
}
```

Successful status (201):
Responds with:

```
{
    message: "Message created."
}
```

### Get Messages Between Two Users ###

> Listed endpoint:
>> GET /messages/:user_id/:friend_id

Gets an array of all messages between two users sorted by when the messages were posted.

Successful status (200):
Responds with:

```
[
    {
        "message_id": "1",
        "from_id": "1",
        "to_id": "2",
        "message": "Hello friend!"
    }
]
```

## Friend Endpoints: ##

### Get User's Friends ###



### Delete Friend ###

## Swipe Endpoints: ##

### Decline Swipe ###
### Request Swipe ###

## Error Responses ##