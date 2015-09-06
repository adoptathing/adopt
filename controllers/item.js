var nodemailer = require('nodemailer');
var Item = require('../models/Item');

/**
 * GET
 * Item page
 */
exports.getItem = function(req, res) {
  if (!req.user) return res.redirect('/login');
  res.render('adopt/problem', {
    title: 'Problem'
  });
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * GET
 * Browse page
 */
exports.getBrowse = function(req, res) {
  if (!req.user) return res.redirect('/login');
  var city = capitalizeFirstLetter(req.params.cityName);
  res.render('adopt/browse', {
    title: 'Browse ' + city + ' Problems'
  });
};

/**
 * GET
 * Add page
 */
exports.getAdd = function(req, res) {
  if (!req.user) return res.redirect('/login');
  var city = capitalizeFirstLetter(req.params.cityName);
  res.render('adopt/add', {
    title: 'Add ' + city + ' Problems'
  });
};