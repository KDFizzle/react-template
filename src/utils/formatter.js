const dateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
export function formatDate(dateString) {
    const date = new Date(dateString)
    return dateFormatter.format(date)
}