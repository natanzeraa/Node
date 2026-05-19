class AuthException extends Error {
  constructor(message, status = 400) {
    super(message)
    this.name = 'AuthException'
    this.status = status
  }
}

class InvalidCredentialsException extends AuthException {
  constructor(message = 'Email ou senha inválidos', status = 401) {
    super(message, status)
    this.name = 'InvalidCredentialsException'
  }
}

class AccountNotFoundException extends AuthException {
  constructor(message = 'Conta não encontrada', status = 404) {
    super(message, status)
    this.name = 'AccountNotFoundException'
  }
}

class TOTPAuthException extends AuthException {
  constructor(
    message = 'O código de autenticação é obrigatório',
    status = 400
  ) {
    super(message, status)
    this.name = 'TOTPAuthException'
  }
}

class TOTPAuthInvalidException extends AuthException {
  constructor(message = 'O código de autenticação é inválido', status = 401) {
    super(message, status)
    this.name = 'TOTPAuthInvalidException'
  }
}

class TOTPAuthExpiredException extends AuthException {
  constructor(message = 'O código de autenticação expirou', status = 401) {
    super(message, status)
    this.name = 'TOTPAuthExpiredException'
  }
}

class TOTPSecretNotFoundException extends AuthException {
  constructor(
    message = 'Secret não encontrado para essa usuário',
    status = 404
  ) {
    super(message, status)
    this.name = 'TOTPSecretNotFoundException'
  }
}

class TOTPAuthNotEnabledException extends AuthException {
  constructor(
    message = 'Autenticação de dois fatores não está habilitada',
    status = 404
  ) {
    super(message, status)
    this.name = 'TOTPAuthNotEnabledException'
  }
}

class TOTPAuthAlreadyEnabledException extends AuthException {
  constructor(
    message = 'Autenticação de dois fatores já está habilitada',
    status = 400
  ) {
    super(message, status)
    this.name = 'TOTPAuthAlreadyEnabledException'
  }
}

class TOTPAuthAlreadyDisabledException extends AuthException {
  constructor(
    message = 'Autenticação de dois fatores já está habilitada',
    status = 400
  ) {
    super(message, status)
    this.name = 'TOTPAuthAlreadyDisabledException'
  }
}

class UserNotFoundException extends AuthException {
  constructor(message = 'Usuário não existe', status = 404) {
    super(message, status)
    this.name = 'UserNotFoundException'
  }
}

export {
  AccountNotFoundException,
  AuthException,
  InvalidCredentialsException,
  TOTPAuthAlreadyDisabledException,
  TOTPAuthAlreadyEnabledException,
  TOTPAuthException,
  TOTPAuthExpiredException,
  TOTPAuthInvalidException,
  TOTPAuthNotEnabledException,
  TOTPSecretNotFoundException,
  UserNotFoundException
}
