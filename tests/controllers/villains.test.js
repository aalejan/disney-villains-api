const chai = require('chai')
const { createSandbox } = require('sinon')
const sinon = require('sinon')
const models = require('../../models')
const { villainsList, singleVillain, createVillain, createVillainResponse } = require('../mocks/villains')
const sinonChai = require('sinon-chai')
const {
  describe, it, before, afterEach, beforeEach, after
} = require('mocha')
const { getAllVillains, getVillainBySlug, saveNewVillain } = require('../../controllers/villains')


chai.use(sinonChai)
const { expect } = chai


describe('Controllers- villains', () => {
  let sandbox
  let stubbedFindOne
  let stubbedSend
  let response
  let stubbedSendStatus
  let stubbedStatusSend
  let stubbedStatus
  let stubbedFindAll
  let stubbedCreate

  before(() => {
    sandbox = createSandbox()

    stubbedFindOne = sandbox.stub(models.villains, 'findOne')
    stubbedFindAll = sandbox.stub(models.villains, 'findAll')
    stubbedCreate = sandbox.stub(models.villains, 'create')
    stubbedSend = sandbox.stub()
    stubbedSendStatus = sandbox.stub()
    stubbedStatusSend = sandbox.stub()
    stubbedStatus = sandbox.stub()

    response = {
      send: stubbedSend,
      sendStatus: stubbedSendStatus,
      status: stubbedStatus,
    }
  })

  beforeEach(() => {
    stubbedStatus.returns({ send: stubbedStatusSend })
  })

  afterEach(() => {
    sandbox.reset()
  })

  after(() => {
    sandbox.restore()
  })
  describe('getAllVillains', () => {
    it('retrieves a list of villains from the database and calls response.send() with the list', async () => {
      stubbedFindAll.returns(villainsList)

      await getAllVillains({}, response)

      expect(stubbedFindAll).to.have.callCount(1)
      expect(stubbedSend).to.have.been.calledWith(villainsList)
    })
  })
  describe('getVillainBySlug', () => {
    // eslint-disable-next-line max-len
    it('retrieves the villain associated with the provided slug from the DB and calls response.send with it', async () => {
      stubbedFindOne.returns(singleVillain)
      const request = { params: { slug: 'hades' } }

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'hades' } })
      expect(stubbedSend).to.have.been.calledWith(singleVillain)
    })
    it('returns a 404 when no villain is found', async () => {
      const request = { params: { slug: 'not found' } }

      stubbedFindOne.returns(null)



      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'not found' } })

      expect(stubbedSendStatus).have.been.calledWith(404)
    })

    it('returns a 500 with an error message when the database call throws an error', async () => {
      stubbedFindOne.throws('ERROR!')
      const request = { params: { slug: 'throw-error' } }

      await getVillainBySlug(request, response)

      expect(stubbedFindOne).to.have.been.calledWith({ where: { slug: 'throw-error' } })
      expect(stubbedStatus).to.have.been.calledWith(500)
      expect(stubbedStatusSend).to.have.been.calledWith('unable to retrieve villain, please try again')
    })
  })

  describe('saveNewVillain', () => {
    // eslint-disable-next-line max-len
    it('accepts new villain and saves them as a new villain, returning the saved record with a 201 status', async () => {
      const request = { body: createVillain }

      stubbedCreate.returns(createVillainResponse)

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.been.calledWith(createVillain)
      expect(stubbedStatus).to.have.been.calledWith(201)
      expect(stubbedStatusSend).to.have.been.calledWith(createVillainResponse)
    })
    it('sends 400 status and error message when required data is not given', async () => {
      const request = { body: { name: createVillainResponse.name, slug: createVillainResponse.slug } }

      await saveNewVillain(request, response)

      expect(stubbedCreate).to.have.callCount(0)
      expect(stubbedStatus).to.have.been.calledWith(400)
      expect(stubbedSend).to.have.been.calledWith('The following fields are required: name, movie, slug')
    })
  })
})
