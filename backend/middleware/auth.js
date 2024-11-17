const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 
  const token = req.headers.authorization?.split(' ')[1];

  console.log('token ji : ', token);
  


  
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
