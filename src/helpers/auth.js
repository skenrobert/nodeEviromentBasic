const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error_msg', 'you are need authenticated or not authorized');
    res.redirect('/users/signin');
}

module.exports = helpers;