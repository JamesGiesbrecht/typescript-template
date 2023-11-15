export const parseNumber = (str: string | number): number => {
  return Number.parseInt(str.toString(), 10)
}

export default {
  parseNumber,
}
