export const successMessages = {
  SUCCESS_LOGING_IN: 'Login realizado com sucesso',
  SUCCESS_CREATING_ACCOUNT: 'Conta criada com sucesso',
  SUCCESS_UPDATING_ACCOUNT: 'Conta atualizada com sucesso',
  SUCCESS_DELETING_ACCOUNT: 'Conta deletada com sucesso',

  // TOTP / 2FA
  SUCCESS_TOTP_ENABLED: 'Autenticação de dois fatores ativada com sucesso',
  SUCCESS_TOTP_DISABLED: 'Autenticação de dois fatores desativada com sucesso',
  SUCCESS_TOTP_VERIFIED: 'Código de autenticação verificado com sucesso'
}

export const errorMessages = {
  // Erros gerais
  ACCOUNT_NOT_FOUND: 'Conta não encontrada',
  ACCOUNT_NAME_DUPLICATED: 'Já existe uma conta com esse nome',
  ACCOUNT_NAME_INVALID: 'O nome da conta é inválido',

  // Validações específicas
  USER_NAME_REQUIRED: 'Nome completo é obrigatório',
  USER_NAME_INVALID: 'Nome completo é inválido',
  USER_OR_TOKEN_MISSING: 'Conta de usuário ou token é inválido',
  USER_NOT_FOUND: 'Usuário não encontrada',

  EMAIL_REQUIRED: 'O e-mail é obrigatório',
  EMAIL_INVALID: 'O e-mail informado é inválido',
  EMAIL_IN_USE_ALREADY: 'Email já está em uso',
  INVALID_CREDENTIALS: 'Email ou senha inválidos',

  PASSWORD_REQUIRED: 'A senha é obrigatória',
  PASSWORD_TOO_SHORT: 'A senha deve ter no mínimo 6 caracteres',
  PASSWORD_TOO_WEAK:
    'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais',

  USERS_REQUIRED: 'Ao menos um usuário deve ser informado',
  USERS_INVALID: 'A lista de usuários é inválida',

  MANDATORY_FIELDS: 'Nome, email e senha são obrigatórios',

  // TOTP / 2FA
  TOTP_REQUIRED: 'O código de autenticação é obrigatório',
  TOTP_INVALID: 'O código de autenticação é inválido',
  TOTP_EXPIRED: 'O código de autenticação expirou',
  TOTP_ALREADY_ENABLED: 'A autenticação de dois fatores já está ativada',
  TOTP_ALREADY_DISABLED: 'A autenticação de dois fatores já está inativa',
  TOTP_NOT_ENABLED: 'A autenticação de dois fatores não está habilitada',
  TOTP_COULD_NOT_BE_ENABLED:
    'A autenticação de dois fatores não foi habilitada para essa usuário',
  TOTP_NOT_GENERATED: 'O código de autenticação não foi gerado',
  TOTP_NOT_FOUND: 'Secret não encontrado para essa usuário',
  TWO_FA_ENABLE_REQUIRED: '2FA é um valor obrigatório (true/false)'
}
