const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ['userId'] }
      }
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { username, name } = req.body
    const user = await User.create({ username, name })
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['name', 'username'],
      include: {
        model: Blog,
        as: 'readings',
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt']
        },
        through: {
          attributes: []
        }
      }
    })
    if (user) {
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username }
    })
    if (user) {
      user.name = req.body.name
      await user.save()
      res.json(user)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router