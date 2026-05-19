export const handleResponse = async (res, serviceCall) => {
  try {
    const response = await serviceCall
    return res.status(response.status).json(response)
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      status: error.status || 500,
      message: error.message || 'Erro interno no servidor'
    })
  }
}
