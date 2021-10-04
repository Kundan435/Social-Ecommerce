import { Product } from './api/v1/models'
import { connectDB } from './config'
import { products } from './data'
import 'colors'
import dotenv from 'dotenv'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    // await Order.deleteMany()
    await Product.deleteMany()
    // await User.deleteMany()

    // const createdUsers = await User.insertMany(users)

    // const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product }
    })

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    // await Order.deleteMany()
    await Product.deleteMany()
    // await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
