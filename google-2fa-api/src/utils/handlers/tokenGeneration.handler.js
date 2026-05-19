import base32Encode from 'base32-encode'
import crypto from 'crypto'

const generateBase32Secret = () => {
  const buffer = crypto.randomBytes(20)
  const base32Secret = base32Encode(buffer, 'RFC4648', { padding: false })
  return base32Secret.substring(0, 24)
}

export { generateBase32Secret }
