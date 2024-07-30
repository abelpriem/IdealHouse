
export default async (req, res) => {
    res.render('auth/restore-password', {
        page: 'Restaurar constraseña',
        csrfToken: req.csrfToken()
    })
}