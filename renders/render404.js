

export default async (req, res) => {
    res.render('404', {
        barra: true,
        page: '404',
        title: '404 Página no encontrada',
        csrfToken: req.csrfToken()
    })
}