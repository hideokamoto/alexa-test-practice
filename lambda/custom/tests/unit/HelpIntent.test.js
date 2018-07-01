/* eslint-disable no-useless-escape */
const { DefaultHandlerAdapter } = require('ask-sdk-core')
const assert = require('power-assert')
const { handler } = require('../../index.js')
const HelpIntentHandler = require('../../handlers/HelpIntent')
const { getHandlerInput, getRequestEnvelopeMock } = require('ask-utils')
const event = getRequestEnvelopeMock()

describe('HelpIntentHandler', () => {
  event.request.type = 'IntentRequest'
  event.request.intent = {
    name: 'AMAZON.HelpIntent'
  }
  it('canHandle test', () => {
    const param = {
      requestEnvelope: event
    }
    const result = HelpIntentHandler.canHandle(param)
    assert.equal(result, true)
  })
  it('lambda invoke test', (done) => {
    handler(event, {}, (error, result) => {
      assert.equal(error, null)
      assert.equal(result.response.outputSpeech.ssml, '<speak>You can say hello to me!</speak>')
      done()
    })
  })
  it('help intent handler test', async () => {
    const handlerAdapter = new DefaultHandlerAdapter()
    const Input = getHandlerInput(event)
    const response = await handlerAdapter.execute(Input, HelpIntentHandler)
    assert.equal(response.outputSpeech.ssml, '<speak>You can say hello to me!</speak>')
    assert.equal(response.shouldEndSession, false)
  })
})
