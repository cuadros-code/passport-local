import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import session from 'express-session'
import cookiePaser from 'cookie-parser'
import authRoute from './routes/authRoutes'
import connectionDB from './config/connectDB'
import passport from 'passport'
import  { configPassport } from './config/passportConfig'
config()


const port = process.env.PORT
const app = express()
connectionDB()
app.use(cors(
  {
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  }
))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookiePaser(process.env.SECRET_SESSION || 'kjdckjs_sajd/sdf'))

app.use(session({
  secret: process.env.SECRET_SESSION || 'kjdckjs_sajd/sdf',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
configPassport(passport)

app.use(authRoute)

app.listen(port, () => console.log('server is ok'))