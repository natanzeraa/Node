import { otpAuthService } from '../services/otpauth.service.js'
import { handleResponse } from '../utils/handlers/response.handler.js'

const enableTOTPAuth = (req, res) => {
  handleResponse(res, otpAuthService.enableTOTPAuth(req.body))
}

const disableTOTPAuth = (req, res) => {
  handleResponse(res, otpAuthService.disableTOTPAuth(req.body))
}

const checkTOTPAuth = (req, res) => {
  handleResponse(res, otpAuthService.checkTOTPAuth(req.body))
}

export { checkTOTPAuth, disableTOTPAuth, enableTOTPAuth }
