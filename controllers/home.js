/**
 * GET /
 * Home page.
 */

 var urllib = require('urllib');
 var Sunlight_API_KEY = '55bfc2ea51944ba58364c6f1d84103d1';

exports.index = function(req, res) {
  if (req.user) {
    var user = req.user;
    if(user.profile.latitude && user.profile.longitude) {
      console.log('http://congress.api.sunlightfoundation.com/legislators/locate?' + 'latitude=' + user.profile.latitude +
      '&' + 'longitude=' + user.profile.longitude + '&' + 'apikey=' + Sunlight_API_KEY);
      urllib.request('http://congress.api.sunlightfoundation.com/legislators/locate?' + 'latitude=' + user.profile.latitude +
      '&' + 'longitude=' + user.profile.longitude + '&' + 'apikey=' + Sunlight_API_KEY, function(err, data, res) {
        if (err) {
          console.log("error! ", err);
        }
       var results = JSON.parse(data.toString()).results;
       var senator_one = null;
       var senator_two = null;
       var congressman = null;

       for (var i = 0; i < results.length; i++) {
         if (results[i].chamber === 'senate') {
           if (senator_one) {
             senator_two = results[i];
           } else {
             senator_one = results[i];
           }
         }

         if (results[i].chamber === 'house') {
           congressman = results[i];
         }
       }

       console.log('senator_one:', senator_one, 'senator_two:', senator_two,
       'congressman', congressman);

       if(!err) {
         res.render('adopt/neighborhood', {
           title: 'Your Neighborhood',
           senator_one: senator_one,
           senator_two: senator_two,
           congressman: congressman
         });
       } else {
         res.render('adopt/neighborhood', {
           title: 'Your Neighborhood',
         });
       }
      });
    }

  } else {
    res.render('home', {
      title: 'Home'
    });
  }
};
