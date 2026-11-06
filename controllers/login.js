const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const { username } = req.body

    const user = await User.findOne({
      where: { username }
    })

    if (!user) {
      return res.status(401).json({
        error: 'invalid username or password'
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id
    }

    const token = jwt.sign(userForToken, SECRET)

    res.status(200).json({
      token,
      username: user.username,
      name: user.name
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router