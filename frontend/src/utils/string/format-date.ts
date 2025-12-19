function formatDate(input: string): string {
  const date = new Date(input)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // Месяцы с 0
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
