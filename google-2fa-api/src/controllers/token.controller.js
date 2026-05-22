import jwt from 'jsonwebtoken'
import { generateTokens } from '../utils/handlers/token.handler.js'

const tokenController = (req, res) => {
  const authHeader = req.headers['authorization']

  if (!authHeader)
    return res.status(401).json({ message: 'Refresh token missing' })

  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: 'Refresh token expired'
        })
      }

      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
          message: 'Invalid refresh token'
        })
      }

      if (err.name === 'NotBeforeError') {
        return res.status(401).json({
          message: 'Token not active yet'
        })
      }

      return res.status(403).json({ message: 'Authentication failed' })
    }
    
    const { accessToken, refreshToken } = generateTokens({ id: decoded.id })

    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
      message: 'Tokens successfully renewed'
    })
  })
}

export { tokenController }
