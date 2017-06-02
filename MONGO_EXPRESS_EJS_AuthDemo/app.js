var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    // allow you to have req.body
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")
    
// if no database auth_demo_app, it will create one for you
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// the sercret will be used to encode and decode the infromation of the sessiion
// here we are requiring and using the package in one scoop
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

// setting passport up
app.use(passport.initialize());
app.use(passport.session());

// User.authenitcate is coming from passportLocalMongoose which set up in user.js
passport.use(new LocalStrategy(User.authenticate()));
// responsible for reading the session, taking the 
//data from the session that's encodede and unecndoing it
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//============
// ROUTES
//============

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret",isLoggedIn, function(req, res){
   res.render("secret"); 
});
//============================================================
//                      Auth Routes
//============================================================

//show sign up form
app.get("/register", function(req, res){
   res.render("register"); 
});
//handling user sign up
app.post("/register", function(req, res){
    // make a User and only pass the username, becuase we don't really pass password to the database
    // and pass the password as a second argument to User.register.
    // User.register will take new user and hash that password, and store in the database.
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        // if no error, passport will log the user in, and take user to servret form
        passport.authenticate("local")(req, res, function(){
           res.redirect("/secret");
        });
    });
});

// LOGIN ROUTES
//render login form
app.get("/login", function(req, res){
   res.render("login"); 
});
//login logic
//middleware
//middleware is some code runs before our final route callback 
// here passport will take username and passport from the form, and compare it to the
// hashed version, and we provide 2 param: successsRedicut and failtureRedirect
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
    req.logout(); //this is provide by passport, and pasport is desctroy user data in the session
    res.redirect("/");
});

// this is a middleware
function loggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started.......");
})