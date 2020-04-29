const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const secret = "kadndak#$%^&*dfreqofn2oa2141341";
    try {
        const token = req.headers.authorization;
        console.log(token);
        jwt.verify(token, secret);
        next();
    }
    catch (err) {
        res.status(401).json({
            data: "You are not authorized to use this Node Js Protected API Endpoint"
        })
    }
}