import { z } from 'zod'
import * as authMsg from '../../utils/messages/auth.messages.js'
import { isValidEmail } from '../../utils/validations/auth.validator.js'

export const signupSchema = z.object({
  name: z
    .string()
    .min(3, authMsg.errorMessages.USER_NAME_INVALID)
    .nonempty(authMsg.errorMessages.USER_NAME_REQUIRED),

  email: z
    .string()
    .nonempty(authMsg.errorMessages.EMAIL_REQUIRED)
    .refine(isValidEmail, { message: authMsg.errorMessages.EMAIL_INVALID }),

  password: z
    .string()
    .nonempty(authMsg.errorMessages.PASSWORD_REQUIRED)
    .min(6, authMsg.errorMessages.PASSWORD_TOO_SHORT),

  twoFaEnabled: z.boolean()
})
