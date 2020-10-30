const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token)
  return res
  .status(401)
  .json({ msg: "No Authentication Token, authorization denied" })

  const verified = jwt.verify(token, process.env.JWT_SECRET)
  req.user = verified.id
  next()
}
module.exports = auth;
