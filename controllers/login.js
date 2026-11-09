const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const { User, Session } = require('../models')

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

    if (user.disabled) {
      return res.status(401).json({
        error: 'account disabled, please contact admin'
      })
    }

    const userForToken = {
      username: user.username,
      id: user.id,
      jti: crypto.randomUUID()
    }

    const token = jwt.sign(userForToken, SECRET)

    await Session.create({ userId: user.id, token })

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