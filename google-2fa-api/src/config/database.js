import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI)
    console.log('DATABASE CONNECTED')
  } catch (error) {
    console.error('ERROR TRYING TO CONNECT TO THE DATABASE', error)
    process.exit(1)
  }
}

export default connectDB
 