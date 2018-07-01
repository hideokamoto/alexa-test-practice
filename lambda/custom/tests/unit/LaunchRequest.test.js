/* eslint-disable no-useless-escape */
const { DefaultHandlerAdapter } = require('ask-sdk-core')
const assert = require('power-assert')
const { handler } = require('../../index.js')
const LaunchRequestHandler = require('../../handlers/LaunchRequest')
const { getHandlerInput, getRequestEnvelopeMock } = require('ask-utils')
const event = getRequestEnvelopeMock()

describe('LaunchRequest', () => {
  it('canHandle test', () => {
    const param = {
      requestEnvelope: event
    }
    const result = LaunchRequestHandler.canHandle(param)
    assert.equal(result, true)
  })
  it('lambda invoke test', (done) => {
    handler(event, {}, (error, result) => {
      assert.equal(error, null)
      assert.equal(result.response.outputSpeech.ssml, '<speak>Welcome to the Alexa Skills Kit, you can say hello!</speak>')
      done()
    })
  })
  it('help intent handler test', async () => {
    const handlerAdapter = new DefaultHandlerAdapter()
    const Input = getHandlerInput(event)
    const response = await handlerAdapter.execute(Input, LaunchRequestHandler)
    assert.equal(response.outputSpeech.ssml, '<speak>Welcome to the Alexa Skills Kit, you can say hello!</speak>')
    assert.equal(response.shouldEndSession, false)
  })
})
