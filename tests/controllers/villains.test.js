const chai = require('chai')
const sinon = require('sinon')
const models = require('../../models')
const { teamsList, singleTeam } = require('../mocks/villains')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')

chai.use(sinonChai)
const { expect } = chai


describe('Controllers- villains', () => {
  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)
    })
  })
})
