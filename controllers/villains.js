const models = require('../models')


const getAllVillains = async (req, res) => {
    const villains =  await models.villains.findAll()

  return res.send(villains)
}
module.exports = {getAllVillains}