import { errorMessages } from '../utils/messages/auth.messages.js'
import { isValidEmail } from '../utils/validations/auth.validator.js'

const validateLogin = (req, res, next) => {
  const { email, password } = req.body

  // E-mail
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: errorMessages.EMAIL_INVALID })
  }

  // Senha
  if (password.length < 6) {
    return res.status(400).json({ message: errorMessages.PASSWORD_TOO_SHORT })
  }

  next()
}

export default validateLogin
