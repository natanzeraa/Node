import { errorMessages } from '../utils/messages/auth.messages.js'
import { isValidEmail } from '../utils/validations/auth.validator.js'

const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body

  const requiredFields = { name, email, password }

  // Verificar campos ausentes
  const missingFields = Object.entries(requiredFields).filter(
    ([_, value]) => !value
  )

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: errorMessages.ERROR_MANDATORY_FIELDS,
      missing: missingFields.map(([key]) => key)
    })
  }

  // Nome da empresa
  if (name.trim().length < 3) {
    return res.status(400).json({ message: errorMessages.USER_NAME_INVALID })
  }

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

export default validateSignup
