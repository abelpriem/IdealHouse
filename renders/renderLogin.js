export default async (req, res) => {
    const { _token } = req.cookies

    res.clearCookie('_token').render('auth/login', {
        page: 'Iniciar sesión',
        csrfToken: req.csrfToken()
    })
}