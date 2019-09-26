# Friend Finder API #

## Table of Contents: ##

<div>
| <a href="#base-api">Base_Api</a> 
| <a href="#auth-endpoints">Auth_Endpoints</a> 
| <a href="#user-endpoints">User_Endpoints</a> 
| <a href="#message-endpoints">Message_Endpoints</a> 
| <a href="#friend-endpoints">Friend_Endpoints</a> 
| <a href="#swipe-endpoints">Swipe_Endpoints</a> 
| <a href="#error-responses">Error_Responses</a> |
</div>

## Base API ##
https://friend-finder-levi.herokuapp.com/api
(All CRUD calls will be made to this url + /[listed endpoint])

## Auth Endpoints ##

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

## User Endpoints ##

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

### User Survey/Update User ###

> Listed endpoint:
>> PUT /survey/:user_id

Updates a user's information via survey. (No auth required)

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
        "user_id": "1",
        "name": "Levi",
        "dob": "1994-09-21",
        "gender": "Male",
        "coordinates": NULL,
        "location": NULL,
        "profile_img": NULL,
        "bio": "This is your friend's bio"
    }, ...
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
        "user_id": "1",
        "name": "Levi",
        "dob": "1994-09-21",
        "gender": "Male",
        "coordinates": NULL,
        "location": NULL,
        "profile_img": NULL,
        "bio": "This is your friend's bio"
    }, ...
]
```

or:

```
{
    message: "You have no requests currently."
}
```

if there are no requests.

## Message Endpoints ##

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
    }, ...
]
```

## Friend Endpoints ##

### Get User's Friends ###

> Listed endpoint:
>> GET /friends/:user_id

Gets an array of all the user's friends.

Successful status (200):
Responds with:

```
[
    {
        "user_id": "1",
        "name": "Levi",
        "dob": "1994-09-21",
        "gender": "Male",
        "coordinates": NULL,
        "location": NULL,
        "profile_img": NULL,
        "bio": "This is your friend's bio"
    }, ...
]
```

### Delete Friend ###

> Listed endpoint:
>> DELETE /friends/:user_id/:friend_id

Removes the given users from your friends list, deletes all previous swipes you had on the given user, and adds a new decline swipe to the Swipes database so that the user will no longer show up in your swipeable users list.

Successful status (200):
Responds with:

```
{
    message: "You'll never see that guy again."
}
```

## Swipe Endpoints ##

### Decline Swipe ###

> Listed endpoint:
>> POST /swipe/:swiper_id/:swiped_id/decline

Creates a "decline swipe" which denotes that the active/swiping user (denoted by swiper_id) does not want to be friends with the user being swiped on (denoted by swiped_id).

Successful status (201):
Responds with:

```
{
    message: "Decline swipe added."
}
```

### Request Swipe ###

> Listed endpoint:
>> POST /swipe/:swiper_id/:swiped_id/request

Creates a "request swipe" which denotes that the active/swiping user (denoted by swiper_id) wants to be friends with the user being swiped on (denoted by swiped_id). 

After the swipe is posted to the database, the API will automatically check if the swiped user has also requested the swiper. If so, the friendship is added to the Friends database and the users will show up in each other's friend lists. Else it will simply add the request swipe.

Successful status (201):
Responds with:

```
{
    message: "Request sent! You might be friends already!"
}
```

## Error Responses ##

### 40X Responses ###

> Status 400:
>> Bad Request (Request body is missing required information)

> Status 401:
>> Unauthorized (Usually in reference to something already in use or data that already exists but that the user doesn't have access to)

> Status 404:
>> Not Found (The data requested doesn't exist)

### 50X Responses ###

> Status 500:
>> Internal Server Error (Either I messed up or the server is currently down)