const LocalStrategy = require('passport-local').Strategy;
const parseString = require('xml2js').parseString;
const axios = require('axios');


const User = require('../app/models/user');
//const Api = require('../config/api');

module.exports = function(passport) {
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Signup
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email

            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            User.findOne({ 'local.email': email }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'the email is already taken'));
                } else {
                    var newUser = new User();
                    //newUser.local.customer = text;
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password);
                    newUser.save(function(err) {
                        if (err) { throw err; }
                        return done(null, newUser);

                    });
                    var customeruser = email, //<-- Take the user of the first part of the Email to symnc with the API
                        separador = "@"
                    limite = 1,
                        customer = customeruser.split(separador, limite);
                    console.log(customer)
                        // API Request XML to JSON
                    const CreateUser = {
                        method: 'get',
                        url: `https://www.voipinfocenter.com/API/Request.ashx?command=createcustomer&username=BTTF.DEV&password=XXXXXXXX&customer=${ customer }&customerpassword=${ password }`,
                    };

                    axios(CreateUser)
                        .then(response => {
                            parseString(response.data, function(err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    events = result
                                    console.log(result.CreateAccount);
                                }
                            });
                        });



                }
            });
        }));







    // login
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, email, password, done) {
            User.findOne({ 'local.email': email }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No User found'))
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Wrong. password'));
                }
                return done(null, user);

            });


            var customeruser = email, //<-- Take the user of the first part of the Email to symnc with the API
                separador = "@"
            limite = 1,
                customer = customeruser.split(separador, limite);
            console.log(customer)

            const GetUserInfo = {
                method: 'get',
                url: `https://www.voipinfocenter.com/API/Request.ashx?command=GetUserInfo&username=BTTF.DEV&password=XXXXXXX&customer=${ customer }&customerpassword=${ password }`,
            };

            axios(GetUserInfo)
                .then(response => {
                    parseString(response.data, function(err, result) {
                        if (err) {
                            console.log(err);
                        } else {

                            events = result

                            //console.log(result.CreateAccount);
                            console.log(events.GetUserInfo)

                        }
                    });
                });








        }));
}
