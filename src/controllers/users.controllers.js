const usersCtrl = {};

const passport = require('passport');
const User = require('../models/User');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    //console.log(req.body);
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: 'password do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'password must be at least 4 charaters'});
    }
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        })
    } else{
           const emailUser = await User.findOne({email: email});
           if(emailUser){
               req.flash('error_msg', 'the email is already in use.');
               res.redirect('/users/signup')
           }else{
               const newUser = new User({name, email, password});
             //  newUser.password = await newUser.encrytPassword(password);
                 newUser.password = await newUser.encryptPassword(password);

               await newUser.save();
               req.flash('succes_msg', 'you are registered');
               res.redirect('/users/signin');
           }
           // res.send('signup succefully');
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate('local',{
    successRedirect: '/notes',
    failureRedirect: 'users/signin',
    failureFlash: true,
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'you are logged out now');
    res.redirect('/users/signin');
}

module.exports = usersCtrl;