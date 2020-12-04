const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((user, cb)=>{
  cb(null,user.id);
});

passport.deserializeUser((id,cb)=>{
  user.findOne({id},cb);
});

passport.use(new LocalStrategy({
  usernameField : "username",
  passwordField : "password",
},(username,password,cb)=>{
  User.findOne({username}, (err,user)=>{
    if(err){
      return err;
    }
    if(!user){
      return cb(null, null, {message : "Username not found"});
    }

    bcrypt.compare(password, user.password, (err, res)=>{
      if(err){
        return cb(err);
      }
      if(!res){
        return cb(null,null, {message })
      }
      return cb(null, null, {message: "Login succesfull"});
    });
  });
}));
