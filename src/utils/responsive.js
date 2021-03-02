const MOBILE_BRAKPOINT = 768

export const isMobile = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth <= MOBILE_BRAKPOINT
}