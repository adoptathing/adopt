/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  if (req.user) {
    res.render('adopt/neighborhood', {
      title: 'Your Neighborhood'
    });
  } else {
    res.render('home', {
      title: 'Home'
    });
  }
};