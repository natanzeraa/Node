import { z } from 'zod'
import * as authMsg from '../../utils/messages/auth.messages.js'

export const loginSchema = z.object({
  email: z
    .string({
      required_error: authMsg.errorMessages.EMAIL_REQUIRED
    })
    .trim()
    .nonempty(authMsg.errorMessages.EMAIL_REQUIRED)
    .email(authMsg.errorMessages.EMAIL_INVALID),

  password: z
    .string({
      required_error: authMsg.errorMessages.PASSWORD_REQUIRED
    })
    .trim()
    .nonempty(authMsg.errorMessages.PASSWORD_REQUIRED)
    .min(6, authMsg.errorMessages.PASSWORD_TOO_SHORT),
})
