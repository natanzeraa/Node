import jwt from 'jsonwebtoken'
import { generateTokens } from '../utils/handlers/token.handler.js'

const tokenController = (req, res) => {
  const authHeader = req.headers['authorization']
  if (!authHeader)
    return res.status(401).json({ message: 'Refresh token missing' })

  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid refresh token' })

    const { accessToken, refreshToken } = generateTokens({ id: decoded.id })

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      message: 'Tokens renovados com sucesso'
    })
  })
}

export { tokenController }

