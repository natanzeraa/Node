import * as OTPAuth from 'otpauth'
import * as QRCode from 'qrcode'
import User from '../models/user.js'
import {
  AuthException,
  TOTPAuthAlreadyDisabledException,
  TOTPAuthAlreadyEnabledException,
  TOTPAuthException,
  TOTPAuthInvalidException,
  TOTPSecretNotFoundException,
  UserNotFoundException
} from '../utils/exceptions/auth.exceptions.js'
import { requiredFieldsHandler } from '../utils/handlers/requiredFileds.handler.js'
import { generateBase32Secret } from '../utils/handlers/tokenGeneration.handler.js'
import * as authMsg from '../utils/messages/auth.messages.js'
import * as userMsg from '../utils/messages/user.messages.js'
import {
  checkTOTPAuthSchema,
  enableTOTPAuthSchema
} from '../utils/schemas/totpauth.schema.js'

const otpAuthService = {
  checkTOTPAuth: async (data) => {
    try {
      if (!data.token) {
        throw new TOTPAuthException(authMsg.errorMessages.TOTP_REQUIRED, 400)
      }

      const parsed = requiredFieldsHandler({
        schema: checkTOTPAuthSchema,
        data: data
      })

      const { token, name, email } = parsed.data

      const user = await User.findOne({
        name: name,
        email: email
      })

      if (!user) {
        throw new UserNotFoundException(
          authMsg.errorMessages.USER_NOT_FOUND,
          404
        )
      }

      if (!user.totp_secret) {
        throw new TOTPSecretNotFoundException(
          authMsg.errorMessages.TOTP_NOT_FOUND,
          404
        )
      }

      let totp = new OTPAuth.TOTP({
        issuer: name,
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: user.totp_secret
      })

      let isValid = totp.validate({ token })

      if (isValid === null) {
        throw new TOTPAuthInvalidException(
          authMsg.errorMessages.TOTP_INVALID,
          400
        )
      }

      return {
        success: true,
        status: 200,
        tokenValid: isValid,
        message: authMsg.successMessages.SUCCESS_TOTP_VERIFIED
      }
    } catch (error) {
      throw new AuthException(error.message, error.status || 500)
    }
  },

  enableTOTPAuth: async (data) => {
    try {
      const parsed = requiredFieldsHandler({
        schema: enableTOTPAuthSchema,
        data: data
      })

      const { name, email } = parsed.data

      const user = await User.findOne({
        name: name,
        email: email
      })

      if (!user) {
        throw new UserNotFoundException(
          authMsg.errorMessages.USER_NOT_FOUND,
          404
        )
      }

      if (user.two_fa_enabled) {
        throw new TOTPAuthAlreadyEnabledException(
          authMsg.errorMessages.TOTP_ALREADY_ENABLED,
          400
        )
      }

      await user.updateOne(
        { $set: { two_fa_enabled: true } },
        { new: true, runValidators: true }
      )

      const totpAuth = await otpAuthService.generateTOTPAuth({
        name,
        email
      })

      return {
        success: true,
        status: 200,
        data: totpAuth,
        message: authMsg.successMessages.SUCCESS_TOTP_ENABLED
      }
    } catch (error) {
      throw new AuthException(error.message, error.status || 500)
    }
  },

  disableTOTPAuth: async (data) => {
    try {
      const parsed = requiredFieldsHandler({
        schema: checkTOTPAuthSchema,
        data: data
      })

      const { name, email, token } = parsed.data

      const user = await User.findOne({
        name: name,
        email: email
      })

      if (!user) {
        throw new UserNotFoundException(
          authMsg.errorMessages.USER_NOT_FOUND,
          404
        )
      }

      if (!user.two_fa_enabled) {
        throw new TOTPAuthAlreadyDisabledException(
          authMsg.errorMessages.TOTP_ALREADY_DISABLED,
          400
        )
      }

      let totp = new OTPAuth.TOTP({
        issuer: name,
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: user.totp_secret
      })

      let isValid = totp.validate({ token })

      if (isValid === null) {
        throw new TOTPAuthInvalidException(
          authMsg.errorMessages.TOTP_INVALID,
          400
        )
      }

      const result = await user.updateOne(
        { $set: { two_fa_enabled: false, totp_secret: '' } },
        { new: true, runValidators: true }
      )

      return {
        success: true,
        status: 200,
        result,
        message: authMsg.successMessages.SUCCESS_TOTP_DISABLED
      }
    } catch (error) {
      throw new AuthException(error.message, error.status || 500)
    }
  },

  generateTOTPAuth: async ({ name, email }) => {
    try {
      const base32Secret = generateBase32Secret()

      const user = await User.findOneAndUpdate(
        { name: name, email: email },
        { totp_secret: base32Secret }
      )

      if (!user) {
        return {
          success: false,
          status: 404,
          message: userMsg.errorMessages.USER_NOT_FOUND
        }
      }

      let totp = new OTPAuth.TOTP({
        issuer: name,
        label: email,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: base32Secret
      })

      let token = totp.generate()
      let delta = totp.validate({ token, window: 1 })
      let counter = totp.counter()
      let remaining = totp.remaining()
      let uri = totp.toString()
      let qrCode = await QRCode.toDataURL(uri)

      totp = OTPAuth.URI.parse(uri)

      if (!totp) {
        return {
          success: false,
          status: 400,
          message: authMsg.errorMessages.TOTP_NOT_GENERATED
        }
      }

      return {
        success: true,
        status: 200,
        qrCode,
        uri,
        delta,
        counter,
        remaining,
        message: authMsg.successMessages.SUCCESS_TOTP_ENABLED
      }
    } catch (error) {
      throw new AuthException(error.message, error.status || 500)
    }
  }
}

export { otpAuthService }
