export function nameFormat (contestants) {
  if (contestants && contestants.name && contestants.name.length > 0) {
    return `${contestants.name}(${contestants.idcard.substr(-6, 6)})${contestants.group}`
  } else {
    return ''
  }
}