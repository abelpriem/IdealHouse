
export default async (req, res) => {
    res.render('auth/register', {
        page: 'Registro',
        csrfToken: req.csrfToken()
    })
}