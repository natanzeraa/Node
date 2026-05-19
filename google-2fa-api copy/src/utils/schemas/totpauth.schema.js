import { z } from 'zod'
import * as authMsg from '../messages/auth.messages.js'

const checkTOTPAuthSchema = z.object({
  name: z
    .string()
    .min(3, authMsg.errorMessages.USER_NAME_INVALID)
    .nonempty(authMsg.errorMessages.USER_NAME_REQUIRED),

  email: z
    .string({
      required_error: authMsg.errorMessages.EMAIL_REQUIRED
    })
    .trim()
    .nonempty(authMsg.errorMessages.EMAIL_REQUIRED)
    .email(authMsg.errorMessages.EMAIL_INVALID),

  token: z
    .string({
      required_error: authMsg.errorMessages.TOTP_INVALID
    })
    .trim()
    .length(6, authMsg.errorMessages.TOTP_INVALID)
})

const enableTOTPAuthSchema = z.object({
  name: z
    .string()
    .min(3, authMsg.errorMessages.USER_NAME_INVALID)
    .nonempty(authMsg.errorMessages.USER_NAME_REQUIRED),

  email: z
    .string({
      required_error: authMsg.errorMessages.EMAIL_REQUIRED
    })
    .trim()
    .nonempty(authMsg.errorMessages.EMAIL_REQUIRED)
    .email(authMsg.errorMessages.EMAIL_INVALID)
})

export { checkTOTPAuthSchema, enableTOTPAuthSchema }
