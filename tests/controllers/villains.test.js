const chai = require('chai')
const sinon = require('sinon')
const models = require('../../models')
const { villainsList, singleVillain, createVillain, createVillainResponse } = require('../mocks/villains')
const sinonChai = require('sinon-chai')
const { describe, it } = require('mocha')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('../../controllers/villains')


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

  describe('saveNewVillain', () => {
    // eslint-disable-next-line max-len
    it('accepts new villain and saves them as a new villain, returning the saved record with a 201 status', async () => {
      const request = { body: createVillain }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      const stubbedCreate = sinon.stub(models, 'create').returns(createVillainResponse)

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(createVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedSend).to.have.been.calledWith(createVillainResponse)
    })
    it('sends 400 status and error message when required data is not given', async () => {
      const request = { body: { name: createVillain.name, slug: createVillain.slug } }
      const stubbedSend = sinon.stub()
      const stubbedStatus = sinon.stub().returns({ send: stubbedSend })
      const response = { status: stubbedStatus }
      // eslint-disable-next-line max-len
      const stubbedCreate = sinon.stub(models.villains, 'create').returns('The following fields are required: name, movie, slug')

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedSend).to.have.been.calledWith('The following fields are required: name, movie, slug')
    })
  })
})
