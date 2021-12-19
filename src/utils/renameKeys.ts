export const renameKeys = <T>(obj: object): T => {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    const modifiedKey = key.replace(/_+([a-z])/g, (g) => g[g.length - 1].toUpperCase())

    return { ...acc, [modifiedKey]: Array.isArray(val) ? renameKeysInArray(val) : val }
  }, {}) as T
}

export const renameKeysInArray = <T extends Array<object>>(array: object[]): T =>
  array.map((elem) => renameKeys(elem)) as T
