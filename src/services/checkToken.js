const jwt = require('jsonwebtoken');

exports.check = function(req, res, next)  {
    const authHeader= req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).send({
            message: 'Acesso negado'
        });
    } else {
        jwt.verify(token, "HSUDHUASBN@#$!@#OK448sa21d54a32re564e41", function (error, decoded) {
            if (error) {
                res.status(401).send({
                    message: 'Token invalido'
                });
            } else {
                next();
            }
        });
    }
}