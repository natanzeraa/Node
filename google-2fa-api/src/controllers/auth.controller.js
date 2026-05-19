import * as auth from '../services/auth.service.js'
import { handleResponse } from '../utils/handlers/response.handler.js'

const login = (req, res) => handleResponse(res, auth.authService.login(req.body))
const signup = (req, res) => handleResponse(res, auth.authService.signup(req.body))

export { login, signup }

