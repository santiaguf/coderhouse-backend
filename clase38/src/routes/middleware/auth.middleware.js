export function auth(req, res, next) {
    if (req.header('secret') === 'palabraclave') {
        next();
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
}