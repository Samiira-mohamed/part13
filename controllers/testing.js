const router = require('express').Router()

const { Blog, User } = require('../models')

router.post('/reset', async (req, res, next) => {
  try {
    await Blog.destroy({ truncate: true, cascade: true, restartIdentity: true })
    await User.destroy({ truncate: true, cascade: true, restartIdentity: true })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router