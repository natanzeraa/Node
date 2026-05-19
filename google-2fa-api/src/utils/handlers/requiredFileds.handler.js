const requiredFieldsHandler = ({ schema, data, res }) => {
  const parsed = schema.safeParse(data)

  if (!parsed.success) {
    const errors = parsed.error.errors.map((err) => ({
      field: err.path[0],
      message: err.message
    }))
    return res.status(400).json({ errors })
  }

  return parsed
}

export { requiredFieldsHandler }

