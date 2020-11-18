const Sequelize = require('sequelize')
const villainsModel = require('./villains')

const connection = new Sequelize('disneyCharacters',
  'villain',
  'myVillain',
  {
    host: 'localhost', dialect: 'mysql'
  })

const teams = teamsModel(connection, Sequelize)

module.exports = {villainsModel }