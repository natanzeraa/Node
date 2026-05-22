import jwt from 'jsonwebtoken'

const checkToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  
  if (!authHeader)
    return res.status(401).json({ message: 'Refresh token missing' })

  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
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
    next()
  })
}

export { checkToken }

