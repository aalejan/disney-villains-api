const models = require('../models')


const getAllVillains = async (req, res) => {
  const villains = await models.villains.findAll()

  return res.send(villains)
}

const getVillainBySlug = async (req, res) => {
  const { slug } = req.params

  const villainFound = await models.villains.findOne({ where: { slug } })

  return res.send(villainFound)
}






module.exports = { getAllVillains, getVillainBySlug }
