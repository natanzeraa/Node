import express from 'express'
import { login, signup } from '../controllers/auth.controller.js'
import { tokenController } from '../controllers/token.controller.js'
import {
  checkTOTPAuth,
  disableTOTPAuth,
  enableTOTPAuth
} from '../controllers/totp.controller.js'
import loginMiddleware from '../middlewares/login.middleware.js'
import signupMiddleware from '../middlewares/signup.middleware.js'
import { checkToken } from '../middlewares/token.middleware.js'

const router = express.Router()

router.post('/signup', signupMiddleware, signup)
router.post('/login', loginMiddleware, login)
router.post('/refresh', tokenController)
router.post('/2fa/enable', checkToken, enableTOTPAuth)
router.post('/2fa/disable', checkToken, disableTOTPAuth)
router.post('/2fa/check', checkToken, checkTOTPAuth)

export default router
