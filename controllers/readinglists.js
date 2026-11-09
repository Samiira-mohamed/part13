const router = require('express').Router()

const { ReadingList, User, Blog } = require('../models')
const { tokenExtractor } = require('../util/middleware')

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

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const reading = await ReadingList.findByPk(req.params.id)
    if (!reading) {
      return res.status(404).json({ error: 'reading list entry not found' })
    }

    if (reading.userId !== req.decodedToken.id) {
      return res.status(403).json({
        error: 'you can only mark blogs in your own reading list as read'
      })
    }

    reading.read = req.body.read
    await reading.save()
    res.json(reading)
  } catch (error) {
    next(error)
  }
})

module.exports = router