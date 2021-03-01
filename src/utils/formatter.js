export const numberFormatter = (number, currency = '') => {
  return currency + number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.')
}

export const ellipsis = (text, length = 50) => {
  return text && text.length > length
    ? text.slice(0, length -3) + '...'
    : text
}
