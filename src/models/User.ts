import { Schema, Document, model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document{
  name : string,
  email: string,
  password : string,
  image : string,
  hiddenPassword:() => IUser
}

const userSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
  },
  image:{
    type: String,
    default: ''
  }
},{
  versionKey: false,
  toJSON:{versionKey: false}
})

// Antes de Guardar una contraseña la "encripto"
userSchema.pre<IUser>('save', async function (next) {
    const password = this.password
    const salt = await bcrypt.genSalt(10)
    const newPassword = await bcrypt.hash(password, salt)
    this.password = newPassword
    next()
})

userSchema.method('hiddenPassword', function () {
  const { _id, password ,...data } : any = this.toObject()
  return{
    id: _id,
    ...data
  }
})


export default model<IUser>('User', userSchema)