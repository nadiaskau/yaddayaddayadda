
exports.ensureAuthenticated = function(req, res, next) {
      if (req.isAuthenticated()) {
          console.log('halløj');
        return next();
      }
      //req.flash('error_msg', 'Please log in to view that resource');
console.log('hello my friend');
          res.redirect('/users/login');
      
    };

exports.forwardAuthenticated = function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');      
  };