import { NextFunction, Request, Response } from 'express'
import User from '../../models/User'
import passport from 'passport'

const login = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if(!user){
        return res.json({
          ok: false,
          msg: 'Usuario o contraseña incorrecto'
        })
      }
      req.logIn( user, (err) => {
        if(err) return next(err)
        const { _doc:{ password , ...rest} } = user
        res.json({
          ok: true,
          user : rest
        })
      })
    })(req, res, next)

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor'
    })
  }
}

const refresh = (req: Request, res : Response) => {
  try {
    passport.authenticate('local',(err, user, next) => {
      req.fresh
    })
  } catch (error) {
    
  }
}

const register = async (req: Request, res: Response) => {
  try {

    const userSaved =  new User(req.body)
    const user = await userSaved.save()
    const hiddenPassword = userSaved.hiddenPassword()

    res.status(201).json({
      ok: true,
      user: hiddenPassword
    })  
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor'
    })
  }
}

export {
  login,
  register
}