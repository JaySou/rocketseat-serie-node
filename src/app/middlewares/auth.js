const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send({ error: 'No token provider' });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({ error: 'Token Ivalid' });
        }

        console.log(decoded);
        req.userid = decoded.id;

        return next();
    });
}