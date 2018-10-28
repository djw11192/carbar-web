var
  User = require('../models/User.js'),
  passport = require('passport'),
  async = require('async'),
  crypto = require('crypto'),
  nodemailer = require('nodemailer')



module.exports = {
  home: function(req, res){
    res.render('home')
  },
  error404: function(req,res){
    res.render('404')
  }

}
