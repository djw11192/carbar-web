var
  express = require('express'),
  app = express(),
  ejs = require('ejs'),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  dotenv = require('dotenv').load({silent: true}),
  http = require('http').Server(app),
  flash = require('connect-flash'),
  MongoStore = require('connect-mongo')(session),
  methodOverride = require('method-override'),
  passport = require('passport'),
  path = require('path'),
  passportConfig = require('./config/passport.js'),
  User = require('./models/User.js'),
  primaryRouter = require('./routes/primaryRouter.js'),
  nodemailer = require('nodemailer'),
  bcrypt = require('bcrypt-nodejs'),
  async = require('async'),
  crypto = require('crypto')


var port = process.env.PORT || 3000
var mongoConnectionString = process.env.MONGO_URL

mongoose.connect(mongoConnectionString, {useMongoClient: true}, function(err){
  if(err) return console.log("cannot connect to Mongo")
  console.log("connected to Mongo")
})

app.use(logger('dev'))
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
	secret: 'carbar',
	cookie: {maxAge: 6000000},
	resave: true,
	saveUninitialized: false,
    store: new MongoStore({url: mongoConnectionString})
}))

app.use(logger('dev'))
app.use(methodOverride('_method'))
app.use(cookieParser())
app.use(flash())//flash application
app.use(passport.initialize())
app.use(passport.session())


//this will add a currentUser to be available in every view
app.use(function(req,res,next){
  if(req.user) req.app.locals.currentUser = req.user
  req.app.locals.loggedIn = !!req.user
  next()
})

// ejs configuration
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(ejsLayouts)
app.use(express.static(__dirname  + '/public'))
app.use('/', primaryRouter)

http.listen(port, function(err){
  if(err) console.log(err);
  console.log("server running on " + port)
})
