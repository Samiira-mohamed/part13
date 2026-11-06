const express = require('express')
const app = express()

const { PORT, TESTING } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const { syncModels } = require('./models')
const { errorHandler } = require('./util/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const testingRouter = require('./controllers/testing')

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('ok')
})

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)

if (TESTING) {
  app.use('/api', testingRouter)
}

app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  await syncModels()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()