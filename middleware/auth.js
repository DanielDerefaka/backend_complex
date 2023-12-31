const jwt = require('jsonwebtoken');

const verifyjwt = (req, res, next) => {
   try {

    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: `Forbidden ` });
        }

        req.user = decoded;
       next();
    });
    
   } catch (error) {
    return res.status(500).json({message: "An Error Occured"})
   }
};




module.exports = verifyjwt;




