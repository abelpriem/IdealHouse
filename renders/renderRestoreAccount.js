export default async (req, res) => {
    res.render('auth/restore-account', {
        page: 'Recuperar cuenta',
        csrfToken: req.csrfToken()
    })
}