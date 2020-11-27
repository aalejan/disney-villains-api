const chai = require('chai')
const sinon = require('sinon')
const models = require('../../models')
const { villainsList, singleVillain } = require('../mocks/villains')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllVillains, getVillainBySlug } = require('../../controllers/villains')
const { request } = require('express')

chai.use(sinonChai)
const { expect } = chai


describe('Controllers- villains', () => {
  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      const stubbedFindAll = sinon.stub(models.villains, 'findAll').returns(villainsList)
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })
  describe('getVillainBySlug', () => {
    // eslint-disable-next-line max-len
    it('retrieves the villain associated with the provided slug from the DB and calls response.send with it', async () => {
      const request = { params: { slug: 'hades' } }
      const stubbedSend = sinon.stub()
      const response = { send: stubbedSend }
      const stubbedFindOne = sinon.stub(models.villains, 'findOne').returns(singleVillain)

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'hades' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
  })
})
