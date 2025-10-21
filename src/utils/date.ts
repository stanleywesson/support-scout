export function getOffsetDate(daysOffset: number) {
  const x = new Date()
  x.setDate(x.getDate() - daysOffset)
  return x
}

export function toShortDate(date?: Date | string) {
  if (!date) {
    return ''
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return dateObj.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
