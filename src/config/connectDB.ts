import mongoose from 'mongoose'

const DB_URL = process.env.MONGO_DB || 'mongodb://localhost:27017/jobs-app'

const connectDB = () => {
  mongoose.connect(DB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('db is ok'))
  .catch((err) => console.log('error in db', err))
}

export default connectDB
