function isSeller(userId, propertyUserId) {
    return userId === propertyUserId
}

function formatDate(date) {
    const newDate = new Date(date).toISOString().slice(0, 10)

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return new Date(newDate).toLocaleDateString('es-ES', options)
}

export {
    isSeller,
    formatDate
}