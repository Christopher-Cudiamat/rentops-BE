const jwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const config = require('config');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const passport = require('passport');

module.exports = passport => {

  passport.use('jwt',new jwtStrategy({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.get('jwtSecret'),
    }, async(payload,done) => {

    try {

      const user = await User.findById(payload.sub).select('-local.password');

      if(!user) {
        return done(null, false); 
      }
  
      done(null, user);

    } catch (error) {

      done(error, false);

    }
  }));

  //LOCAL STRATEGY
  passport.use(new LocalStrategy({
    usernameField: 'email',
    }, async (email,password, done) => {
      try {
        
        const user = await User.findOne({"local.email": email});

        if (!user) {
          return done(null,false, { message: 'bad password' });
        }

        const isMatch = await user.isValidPassword(password);
    
        if (!isMatch){
          return done(null,false,{ message: 'bad password' });
        } 
    
        done(null,user);
      } catch (error) {
        done(error,false,{ message: 'bad password' });
      }
      
    }
  ));
}