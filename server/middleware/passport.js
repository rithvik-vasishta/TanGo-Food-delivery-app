const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


const config = require('../config/config');
const userControler = require('../controllers/user.controller');


const localLogin = new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (email, password, done)=>{
        const user = userControler.getUserByEmailIdAndPassword(email,password);
        return user
        ?done(null,user)
        :done(null,false,{
            error:'Your login cred is not valid. Tyr again'
        });

    }
);



const jwtLogin = new JwtStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwtSecret

    },
    async (payload, done) =>{
        const user = await userControler.getUserById(payload._id);
        return user
        ?done(null,user)
        :done(null,false,{
            error:'Your login cred is not valid. Tyr again'
        });

    }

);


module.exports = passport.use(localLogin).use(jwtLogin);