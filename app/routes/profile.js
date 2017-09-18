const express = require('express')
const authController = require('../controllers/auth')

const router = express.Router()
const authRouter = express.Router()

router.use('/auth', authRouter)

authRouter.post('/register', authController.register)

module.exports = router
