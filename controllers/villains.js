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

const saveNewVillain = async (req, res) => {
  const { name, movie, slug } = req.body

  if (!name || !movie || !slug) {
    return res.status(400).send('The following fields are required: name, movie, slug')
  }

  const newVillain = await models.villains.create({ name, movie, slug })

  return res.status(201).send(newVillain)
}

module.exports = { getAllVillains, getVillainBySlug, saveNewVillain }
