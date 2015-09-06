/**
 * GET /
 * Home page.
 */

 var urllib = require('urllib');
 var Sunlight_API_KEY = '55bfc2ea51944ba58364c6f1d84103d1';

exports.index = function(req, res) {
  if (req.user) {
    var state_rep = null;
    var congressman = null;
    var user = req.user;
    if(user.profile.latitude && user.profile.longitude) {
      console.log('http://congress.api.sunlightfoundation.com/legislators/locate?' + 'latitude=' + user.profile.latitude +
      '&' + 'longitude=' + user.profile.longitude + '&' + 'apikey=' + Sunlight_API_KEY);
      urllib.request('http://congress.api.sunlightfoundation.com/legislators/locate?' + 'latitude=' + user.profile.latitude +
      '&' + 'longitude=' + user.profile.longitude + '&' + 'apikey=' + Sunlight_API_KEY, function(err, data, resp) {
        if (err) {
          console.log('error! ', err);
        }
       var results = JSON.parse(data.toString()).results;

       for (var i = 0; i < results.length; i++) {
         if (results[i].chamber === 'house') {
           congressman = results[i];
         }
       }

       if(!err) {
         console.log('http://openstates.org/api/v1/legislators/geo/?lat=' + user.profile.latitude +
         '&' + 'long=' + user.profile.longitude + '&' + 'apikey=' + Sunlight_API_KEY);
         urllib.request('http://openstates.org/api/v1/legislators/geo/?lat=' + user.profile.latitude +
         '&' + 'long=' + user.profile.longitude + '&' + 'apikey=' + Sunlight_API_KEY, function(err, state_data, state_resp) {
           console.log(state_data.toString()[0]);
           var stateResults = JSON.parse(state_data.toString());
           var state_rep = stateResults[0];


           if(!err) {
             res.render('adopt/neighborhood', {
               title: user.profile.city,
               state_rep: state_rep.full_name,
               state_link: state_rep.sources[Math.max(state_rep.sources.length - 1, 0)].url,
               congressman: congressman.first_name + ' ' + congressman.last_name,
               congressman_link: congressman.contact_form
             });
           }
         }
       );
       } else {
         res.render('adopt/neighborhood', {
           title: user.profile.city,
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
