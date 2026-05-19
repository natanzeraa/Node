import jwt from 'jsonwebtoken'

const checkToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  if (!authHeader)
    return res.status(401).json({ message: 'Refresh token missing' })

  const token = authHeader.split(' ')[1]
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })
    next()
  })
}

export { checkToken }

