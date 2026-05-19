import bcrypt from 'bcrypt'
import { default as User } from '../models/user.js'
import { AuthException } from '../utils/exceptions/auth.exceptions.js'
import { requiredFieldsHandler } from '../utils/handlers/requiredFileds.handler.js'
import { generateTokens } from '../utils/handlers/token.handler.js'
import * as authMsg from '../utils/messages/auth.messages.js'
import * as userMsg from '../utils/messages/user.messages.js'
import { loginSchema } from '../utils/schemas/login.schema.js'
import { signupSchema } from '../utils/schemas/signup.schema.js'
import { otpAuthService } from './otpauth.service.js'

export const authService = {
  login: async (data) => {
    try {
      const parsed = requiredFieldsHandler({ schema: loginSchema, data: data })

      const { email, password } = parsed.data

      const user = await User.findOne({ email })
      if (!user) {
        throw new AuthException(userMsg.errorMessages.USER_NOT_FOUND, 404)
      }

      const passwordsMatch = bcrypt.compare(password, user.password)
      if (!passwordsMatch) {
        throw new AuthException(authMsg.errorMessages.INVALID_CREDENTIALS, 400)
      }

      if (user.two_fa_enabled) {
        const result = await otpAuthService.checkTOTPAuth({
          token: data.token,
          name: user.name,
          email: user.email
        })

        if (!result.success) {
          throw new AuthException(authMsg.errorMessages.TOTP_INVALID, 400)
        }
      }

      const { accessToken, refreshToken } = generateTokens({
        id: user._id
      })

      return {
        success: true,
        status: 200,
        user: {
          _id: user._id,
          id: user.id,
          name: user.name,
          email: user.email,
          cnpj: user.cnpj,
          phone: user.phone,
          twoFaEnabled: user.two_fa_enabled
        },
        accessToken,
        refreshToken,
        message: authMsg.successMessages.SUCCESS_LOGING_IN
      }
    } catch (error) {
      throw new AuthException(error.message, error.status || 500)
    }
  },

  signup: async (data) => {
    try {
      const parsed = requiredFieldsHandler({ schema: signupSchema, data: data })

      const { name, email, password, twoFaEnabled } = parsed.data

      const emailExists = await User.findOne({ email })
      if (emailExists)
        throw new AuthException(authMsg.errorMessages.EMAIL_IN_USE_ALREADY)

      const user = new User({
        name,
        email,
        password,
        two_fa_enabled: twoFaEnabled
      })

      await user.save()

      const { accessToken, refreshToken } = generateTokens({
        id: user._id
      })

      return {
        success: true,
        status: 201,
        user: {
          _id: user._id,
          id: user.id,
          name: user.name,
          email: user.email,
          twoFaEnabled: user.two_fa_enabled
        },
        accessToken,
        refreshToken,
        message: authMsg.successMessages.SUCCESS_CREATING_ACCOUNT
      }
    } catch (error) {
      throw new AuthException(error.message, error.status || 500)
    }
  }
}
