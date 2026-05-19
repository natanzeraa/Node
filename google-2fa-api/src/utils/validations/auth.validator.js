const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isValidCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, '')
  return cnpj.length === 14
}

export { isValidCNPJ, isValidEmail }

