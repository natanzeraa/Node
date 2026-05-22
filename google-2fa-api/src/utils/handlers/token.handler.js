import jwt from 'jsonwebtoken'

export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1m'
  })
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d'
  })
  return { accessToken, refreshToken }
}
