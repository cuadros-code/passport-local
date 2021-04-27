import User, { IUser } from '../models/User'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import { NativeError } from 'mongoose'
import { PassportStatic } from 'passport'
const LocalStrategy = passportLocal.Strategy 

export function configPassport (passport: PassportStatic ) {

  passport.use( new LocalStrategy((username, password, done) => {

        User.findOne({email: username}, (err : NativeError, user: IUser) => {
        if (err) throw err;
        if (!user) return done(null, false);
        if(!user){
          return done( null, false)
        }
        bcrypt.compare(password, user.password, ( err, result ) => {
          if(err) throw err
          if (result){
            return done(null, user)
          }else{
            return done( null, false)
          }
        })
      }) 
  }))

  passport.serializeUser((user, cb) => {
    cb(null, user)
  })
  
  passport.deserializeUser( (id, cb) => {
    User.findOne({ _id: id}, (err: NativeError, user: IUser) => {
      const userInfo = {
        id: user._id,
        name: user.name,
      }
      cb(err, userInfo)
    })
  })
}

