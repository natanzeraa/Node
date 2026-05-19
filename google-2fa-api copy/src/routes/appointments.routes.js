import express from 'express'
import { checkToken } from '../middlewares/token.middleware.js'
import appointmentsMock from '../mocks/appointments.mock.json' with { type: 'json' }

const router = express.Router()

/**
 * @route GET /appointments
 * @middleware checkToken
 * @description
 *  Essa rota tem como propósito checar a validade do token de autenticação.
 *  Se o token for válido, retorna um mock de agendamentos de serviços de nail designer.
 *
 * @returns {Object} Exemplo de resposta de sucesso:
 * {
 *   "success": true,
 *   "status": 200,
 *   "data": [
 *     {
 *       "id": 1,
 *       "clientName": "Maria Souza",
 *       "service": "Esmaltação em gel",
 *       "date": "2025-09-01",
 *       "time": "14:00"
 *     }
 *   ]
 * }
 */
router.get('/appointments', checkToken, (req, res) => {
  res.json(appointmentsMock)
})

export default router
