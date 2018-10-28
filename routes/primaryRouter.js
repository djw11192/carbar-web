var
  express = require('express'),
  primaryRouter = express.Router(),
  primaryController = require('../controllers/primaryController.js');

primaryRouter.route('/')
  .get(primaryController.home)

///Place error route as last get/////
primaryRouter.route('/*')
  .get(primaryController.error404)

module.exports = primaryRouter;
