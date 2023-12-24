const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123');

            req.userId = decoded._id;

            next();
        } catch (e) {
            console.log(e);
            return res.status(403).json({
                message: "no access"
            })
        }
    } else {
        return res.status(403).json({
            message: "no access"
        })
    }
}

module.exports = checkAuth;