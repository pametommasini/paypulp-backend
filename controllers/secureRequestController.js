const secureRequestController = async (req, res) => {
    res.json({
      title: 'mi ruta protegida',
      user: req.user
    })
  }
  
  module.exports = secureRequestController;