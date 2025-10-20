export function getOffsetDate(daysOffset: number) {
  const x = new Date()
  x.setDate(x.getDate() - daysOffset)
  return x
}

export function toShortDate(date?: Date) {
  if (!date) {
    return ''
  }

  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
