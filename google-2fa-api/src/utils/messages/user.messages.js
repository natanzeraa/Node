export const successMessages = {
  SUCCESS_CREATING_USER: 'Usuário criada com sucesso',
  SUCCESS_UPDATING_USER: 'Usuário atualizada com sucesso',
  SUCCESS_DELETING_USER: 'Usuário deletada com sucesso',
  SUCCESS_FETCHING_USER: 'Usuário encontrado com sucesso'
}

export const errorMessages = {
  USER_NOT_FOUND: 'Usuário não encontrado',
  USERNAME_DUPLICATED: 'Já existe um usuário com esse nome',
  USERNAME_INVALID: 'O nome de usuário é inválido',

  USER_NAME_REQUIRED: 'Nome completo é obrigatório',
  USER_NAME_INVALID: 'Nome completo informado é inválido',

  EMAIL_REQUIRED: 'O e-mail é obrigatório',
  EMAIL_INVALID: 'O e-mail informado é inválido',
  EMAIL_IN_USE_ALREADY: 'O e-mail já está em uso',

  PHONE_REQUIRED: 'O número de telefone é obrigatório',
  PHONE_INVALID: 'O número de telefone informado é inválido',
  PHONE_IN_USE_ALREADY: 'O telefone já está em uso',

  PASSWORD_REQUIRED: 'A senha é obrigatória',
  PASSWORD_TOO_SHORT: 'A senha deve ter no mínimo 6 caracteres',
  PASSWORD_TOO_WEAK:
    'A senha deve conter letras maiúsculas, minúsculas, números e caractéres especiais',

  INTERNAL_SERVER_ERROR:
    'Erro interno no servidor. Por favor, tente novamente mais tarde.'
}
