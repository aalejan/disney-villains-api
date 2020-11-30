
const models = require('../models')

const getAllVillains = async (req, res) => {
  const villains = await models.villains.findAll()

  return res.send(villains)
}

const getVillainBySlug = async (req, res) => {
  try {
    const { slug } = req.params

    const villainFound = await models.villains.findOne({ where: { slug } })

    return villainFound
      ? res.send(villainFound)
      : res.sendStatus(404)
  } catch (error) {
    return res.status(500).send('unable to retrieve villain, please try again')
  }
}

const saveNewVillain = async (req, res) => {
  const { name, movie, slug } = req.body

  try {
    if (!name || !movie || !slug) {
      return res.status(400).send('The following fields are required: name, movie, slug')
    }

    const newVillain = await models.villains.create({ name, movie, slug })

    return res.status(201).send(newVillain)
  } catch (error) {
    return res.status(500).send('unable to create villain, please try again')
  }
}

module.exports = { getAllVillains, getVillainBySlug, saveNewVillain }
