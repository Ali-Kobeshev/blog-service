```js
//input data
//get profile
GET [serviceAPI]/profile/get/:id = {
   params: {
      id: objectId,
   }
}

//response
//get profile
GET [serviceAPI]/profile/get/:id = {
   "_id": objectId,
   "name": string,
   "avatar": {
       "link": null,
       "public_id": null
   },
   "postListId": objectId,
   "likedPostListId": objectId,
   "subscriberListId": objectId,
   "subscriptionsListId": objectId,
   "registrationDate": number,
   "__v": 0
}

//input data
//update profile presentation
//? optional param
GET [serviceAPI]/profile/update/presentation = {
   form-data: {
      file?: image,
      name?: string
   }
   Headers: {
      Authorization: "Bearer [accessToken]"
   }
}

//response
//update profile presentation
GET [serviceAPI]/profile/update/presentation = {
   body: {
      "_id": "67e030b4143a6ab35944ff2a",
      "name": "chilloutXXX",
      "avatar": {
         "link": "https://res.cloudinary.com/dhfe5kc4h/image/upload/c_auto,f_auto,g_auto,h_500,q_auto,w_500/c7bdabe6-4953-4951-ae97-0f87c2bb8359?_a=BAMCkGRg0",
         "public_id": "c7bdabe6-4953-4951-ae97-0f87c2bb8359"
      },
      "postListId": "67e030b3143a6ab35944ff22",
      "likedPostListId": "67e030b3143a6ab35944ff24",
      "subscriberListId": "67e030b3143a6ab35944ff26",
      "subscriptionsListId": "67e030b3143a6ab35944ff28",
      "registrationDate": 1742745780054,
      "__v": 0
   }
}
```
