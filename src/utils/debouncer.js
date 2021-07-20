const debouncerIds = {}

export default function debounce (func, delay, id) {
  const debouncerId = func + id
  clearTimeout(debouncerIds[debouncerId])
  debouncerIds[debouncerId] = setTimeout(func, delay)
}