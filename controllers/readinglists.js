const router = require('express').Router()

const { ReadingList, User, Blog } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const { blogId, userId } = req.body

    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(400).json({ error: 'user not found' })
    }

    const blog = await Blog.findByPk(blogId)
    if (!blog) {
      return res.status(400).json({ error: 'blog not found' })
    }

    const reading = await ReadingList.create({ userId, blogId })
    res.json(reading)
  } catch (error) {
    next(error)
  }
})

module.exports = router