## How to run
```
node app.js
```


```
.
|____app.js
|____models
| |____user.js
|____package.json
|____README.md
|____views              (by default, express serve this folder)
| |____home.ejs
| |____login.ejs
| |____register.ejs
| |____secret.ejs
```

## Set up
```
npm install passport --save
npm install passport-local --save
npm install passport-local-mongoose --save
```


## Note
In order to make Authentication work, we have to know Session!!! Because HTTP is supposed to be a stateless protocal, which means when you send request, those request are one time thing, and they don't contain information about your history or the previous requests. The request doesn't have state, it's just a 1 time transation. 
Session  is a way to make HTTP not statsless. So once I am loggin in, for every request I made, there's a little bit information about the user that is saved to the request, and send to the server. It's not username or password, and it's encoded and made to be a secert.


#Authentication

### Notes

salt: help us unhash the password



##Intro to Auth
* What tools are we using?
    * Passport 
    * Passport Local
    * Passport Local Mongoose
* Walk through auth flow
* Discuss sessions
    * Express-Session

#Auth CodeAlong Part 1
* Set up folder structure
* Install needed packages
* Add root route and template
* Add secret route and template

#Auth CodeAlong Part 2
* Create User model
* Configure passport

#Auth CodeAlong Part 3
* Add Register routes
* Add Register form

#Auth CodeAlong Part 4
* Add Login routes
* Add Login form

#Auth CodeAlong Part 5
* Add Logout Route
* Add isLoggedIn middleware