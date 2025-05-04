# Также можно в качестве дополнительной документалки использовать файлы src/models/

```js
//input data
//registration
POST [serviceAPI]/identity/registration = {
    body: {
        "email": "example@gmail.com",
        "password": "string"
    }
}

//response
//registration
POST [serviceAPI]/identity/registration = {
    body: {"accountData": {
        "_id": "objectId",
        "profileId": "objectId",
        "email": "example@gmail.com",
        "isActivated": boolean,
        "roles": [
            {
                "role": "unactivated-user",
                "permissions": [
                    {
                        "permission": "read",
                        "scopes": [
                            "public-content"
                        ]
                    }
                ]
            }
        ]
    },
    "profile": {
        "name": "New user",
        "avatar": {
            "link": null,
            "public_id": null
        },
        "postListId": "objectId",
        "likedPostListId": "objectId",
        "subscriberListId": "objectId",
        "subscriptionsListId": "objectId",
        "_id": "objectId",
        "registrationDate": number,
        "__v": 0
    },
    "accessToken": "string"}
    Cookies: {
       refreshToken: string
    }
}

//input data
//send link
POST [serviceAPI]/identity/activate/send-link = {
    body: "email": "example@gmail.com"
}

//response
//send link
POST [serviceAPI]/identity/activate/send-link = {
    body: boolean,
}

//input data
//activate
GET [serviceAPI]/identity/activate/:email/:code = {
    params: {
        email: "example@gmail.com",
        code: string
    }
}

//response
//activate
GET [serviceAPI]/identity/activate/:email/:code = {
    body: {
    "accountData": {
        "_id": "objectId",
        "profileId": "objectId",
        "email": "example@gmail.com",
        "isActivated": boolean,
        "roles": [
            {
                "role": "activated-user",
                "permissions": [
                    {
                        "permission": "create",
                        "scopes": [
                            "own-content"
                        ]
                    },
                    {
                        "permission": "update",
                        "scopes": [
                            "own-content"
                        ]
                    },
                    {
                        "permission": "delete",
                        "scopes": [
                            "own-content"
                        ]
                    },
                    {
                        "permission": "read",
                        "scopes": [
                            "public-content"
                        ]
                    }
                ]
            }
        ]
    },
    "accessToken": string
    }
    Cookies: {
        refreshToken: string
    }
}

//input data
//login
POST [serviceAPI]/identity/login = {
    body: {
        email: "example@gmail.com",
        password: string
    }
}

//response
//login
POST [serviceAPI]/identity/login = {
    body: identical to `GET [serviceAPI]/identity/activate/:email/:code`,
    Cookies: {
        refreshToken: string
    }
}

//input data
//refresh
GET [serviceAPI]/identity/refresh = {
    Cookies: {
        refreshToken: string
    }
}

//response
//refresh
GET [serviceAPI]/identity/refresh = {
    Body: {
        message: string,
        accessToken: string
    },
    Cookies: {
        refreshToken: string
    }
}

// //input data
// //logout
// POST [serviceAPI]/identity/logout = {
//     Cookies: {
//         refreshToken: string
//     }
// }

// //response
// //logout
// POST [serviceAPI]/identity/logout = {
//     Body: {
//         message: string
//     }
// }
```
