export default function formatDate(dateString: string) {
  const date = new Date(dateString)
  return `${date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })} um ${date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })}`
}
