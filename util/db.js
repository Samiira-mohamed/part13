const Sequelize = require('sequelize')
const { DATABASE_URL, TEST_DATABASE_URL, TESTING } = require('./config')

const databaseUrl = TESTING ? TEST_DATABASE_URL : DATABASE_URL
const useSsl = !databaseUrl.includes('sslmode=disable')

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: useSsl
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {}
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }