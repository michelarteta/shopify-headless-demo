export const flattenGQLResponse = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  Object.keys(obj).forEach((key) => {
    if (['data', 'node', 'edges'].includes(key)) {
      obj = flattenGQLResponse(obj[key])
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map((inner) => flattenGQLResponse(inner))
    } else {
      obj[key] = flattenGQLResponse(obj[key])
    }
  })

  return obj
}
