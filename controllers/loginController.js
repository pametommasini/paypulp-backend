const jwt = require('jsonwebtoken')

const loginController = async (req, res) => {
  const { username, password } = req.body
  // comprobar si el user existe y si la contraseña coincide
  const token = jwt.sign({ username }, process.env.SECRET, {
    algorithm: 'HS256',
    expiresIn: 3000
  })
    
  res.json({token})
}
module.exports = loginController;