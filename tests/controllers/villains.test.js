const chai = require('chai')
const sinon = require('sinon')
const models = require('../../models')
const { villainsList, singleVillain } = require('../mocks/villains')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllVillains } = require('../../controllers/villains')

chai.use(sinonChai)
const { expect } = chai


describe('Controllers- villains', () => {
  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)
      const stubbedSend = sinon.stub()
      const response = {send: stubbedSend }

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })
})
